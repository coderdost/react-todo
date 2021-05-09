import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState({ name: '', completed: false });
  const [tasks, setTasks] = useState([]);
  const getTasks = () => {
    return tasks.map((task, index) => (
      <li
        class={
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
  const updateTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1, {
      name: newTasks[i].name,
      completed: !newTasks[i].completed,
    });
    setTasks(newTasks);
  };
  const deleteTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  const addTask = (t) => {
    if (t) {
      const newTasks = [...tasks];
      newTasks.push({ name: t, completed: false });
      setTasks(newTasks);
      setTask({ name: '', completed: false });
    } else {
      alert('enter valid value');
    }
  };

  return (
    <div className="App">
      <input
        class="form-control"
        type="text"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task.name}
        placeholder="enter the task"
      ></input>
      <button
        class="btn btn-success w-100"
        onClick={() => {
          addTask(task);
        }}
      >
        Change
      </button>
      <ul class="list-group">{getTasks()}</ul>
    </div>
  );
}

export default App;
