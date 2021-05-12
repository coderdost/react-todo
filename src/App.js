import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App({ db }) {


  const [task, setTask] = useState({ name: '', completed: false });
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('time')


  useEffect(() => {
    db.collection('tasks').orderBy(sortOption)
      .get()
      .then((querySnapshot) => {
          const allTasks = []
          querySnapshot.forEach((doc)=>{
            allTasks.push(doc.data())
          })
          if(allTasks.length){
            setTasks(allTasks);
          }
      });
  }, [sortOption]);

  const sortTask =(option)=>{
   setSortOption(option);
  }
  
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
  // const storeTasks = (tasks) => {
  //   setTasks(tasks);
  //   db.collection('tasks').doc('first').set({
  //     tasks: tasks,
  //   });
  // };

  const addTasksToFirebase = (task)=>{
    const taskRef = db.collection('tasks').doc();
    const newTask = {...task, id: taskRef.id, time: new Date()};
    taskRef.set(newTask).then(()=>{
      setTasks([...tasks,newTask]);
    })
  }

  const deleteTaskFromFirebase = (task)=>{
   
    const taskRef = db.collection('tasks').doc(task.id);

    taskRef.delete().then(()=>{
      console.log('deleted', task.id);
      setTasks(tasks.filter(t=> t.id!==task.id));
    })
  }

  const updateTaskFromFirebase = (task,i)=>{
   
    const taskRef = db.collection('tasks').doc(task.id);

    taskRef.update(task).then(()=>{
      console.log('updated', task.id);
      const allTasks = [...tasks]
      allTasks.splice(i,1,task);
      setTasks(allTasks);
    })
  }


  const updateTask = (i) => {
    const updatedTask = {...tasks[i], completed: !tasks[i].completed}
    updateTaskFromFirebase(updatedTask,i);

  };
  const deleteTask = (i) => {
    
    deleteTaskFromFirebase(tasks[i]);
  };
  const addTask = (t) => {
    if (t) {
      const newTasks = [...tasks];
      addTasksToFirebase({ name: t, completed: false });
      // storeTasks(newTasks);
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
      <br></br>
      <button
        className="btn btn-warning"
        onClick={() => {
          sortTask('name');
        }}
      >
        Sort by Name
      </button>
      <button
        className="btn btn-warning"
        onClick={() => {
          sortTask('completed');
        }}
      >
        Sort by Completed
      </button>
      <ul className="list-group">{getTasks()}</ul>
    </div>
  );
}

export default App;
