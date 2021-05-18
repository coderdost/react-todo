import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import List from './List';
import Controls from './Controls';
import Nav from './Nav';
import {
  addTasksToFirebase,
  updateTaskFromFirebase,
  deleteTaskFromFirebase,
  getTasksByName,
  getTasksByCompleted,
  getTasksBySorting,
  getTasksNext,
  getTasksPrev,
} from './firebase';

function App() {
  const pageSize = 4;
  const [task, setTask] = useState({ name: '', completed: false });
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('time');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState(2);
  const [firstDoc, setFirstDoc] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let queryRef;
    switch (filter) {
      case 0:
        queryRef = getTasksByName(search);
        break;
      case 1:
        queryRef = getTasksByCompleted(status);
        break;
      case 2:
        queryRef = getTasksBySorting(sortOption, pageSize);
        break;
      case 3:
        queryRef = getTasksNext(sortOption, pageSize, lastDoc);
        break;
      case 4:
        queryRef = getTasksPrev(sortOption, pageSize, firstDoc);
        break;
    }

    queryRef.then((querySnapshot) => {
      const allTasks = [];
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allTasks.push(doc.data());
        allDocs.push(doc);
      });
      if (allTasks.length) {
        setFirstDoc(allDocs[0]);
        setLastDoc(allDocs[allDocs.length - 1]);
        setTasks(allTasks);
      }
    });
  }, [sortOption, search, status, filter, page]);

  const goToNext = () => {
    setFilter(3);
    setPage(page + 1);
  };
  const goToPrev = () => {
    setFilter(4);
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const sortTask = (option) => {
    setFilter(2);
    setSortOption(option);
  };
  const searchTask = (text) => {
    setFilter(0);
    setSearch(text);
  };
  const searchByStatus = (status) => {
    setFilter(1);
    setStatus(status);
  };

  const updateTask = (i) => {
    const updatedTask = { ...tasks[i], completed: !tasks[i].completed };
    updateTaskFromFirebase(updatedTask, i).then(() => {
      console.log('updated', updatedTask.id);
      const allTasks = [...tasks];
      allTasks.splice(i, 1, updatedTask);
      setTasks(allTasks);
    });
  };
  const deleteTask = (i) => {
    deleteTaskFromFirebase(tasks[i]).then(() => {
      console.log('deleted', tasks[i].id);
      setTasks(tasks.filter((t) => t.id !== tasks[i].id));
    });
  };
  const addTask = (t) => {
    if (t) {
      const newTasks = [...tasks];
      addTasksToFirebase({ name: t, completed: false }).then((newTask) => {
        if (tasks.length < pageSize) {
          setTasks([...tasks, newTask]);
        } else {
          alert('added to last page');
        }
      });
      // storeTasks(newTasks);
      setTask({ name: '', completed: false });
    } else {
      alert('enter valid value');
    }
  };

  const listProps = { tasks, updateTask, deleteTask };
  const controlsProps = {
    task,
    search,
    setTask,
    addTask,
    sortTask,
    searchByStatus,
    searchTask,
  };
  const navProps = { goToPrev, goToNext, page };
  return (
    <div className="App">
      <Controls {...controlsProps}></Controls>
      <List {...listProps}></List>
      <Nav {...navProps}></Nav>
    </div>
  );
}

export default App;
