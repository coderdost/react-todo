import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App({db}) {

  useEffect(()=>{
    db.collection('tasks').doc('first').get().then((doc)=>{
      console.log(doc.data());
      setTasks(doc.data().tasks)
    })
  },[])
  
  const [task, setTask] = useState({ name: '', completed: false });
  const [tasks, setTasks] = useState([]);
  const getTasks = () => {
    return tasks.map((task, index) => (
      <li
        key={index}
        className={
          task.completed
            ? 'list-group-item list-group-item-success'
            : 'list-group-item list-group-item-danger'
        }
        onClick={() => {
          updateTask(index);
        }}
        onDoubleClick={() => {
          deleteTask(index);
        }}
      >
        {task.name}
      </li>
    ));
  };
const storeTasks = (tasks)=>{
  setTasks(tasks);
  db.collection('tasks').doc('first').set({
    tasks : tasks
  })
}

  const updateTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1, {
      name: newTasks[i].name,
      completed: !newTasks[i].completed,
    });
    storeTasks(newTasks);
  };
  const deleteTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    storeTasks(newTasks);
  };
  const addTask = (t) => {
    if (t) {
      const newTasks = [...tasks];
      newTasks.push({ name: t, completed: false });
      storeTasks(newTasks);
      setTask({ name: '', completed: false });
    } else {
      alert('enter valid value');
    }
  };

  return (
    <div className="App">
      <input
        className="form-control"
        type="text"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task.name}
        placeholder="enter the task"
      ></input>
      <button
        className="btn btn-success w-100"
        onClick={() => {
          addTask(task);
        }}
      >
        Change
      </button>
      <ul className="list-group">{getTasks()}</ul>
    </div>
  );
}

export default App;
