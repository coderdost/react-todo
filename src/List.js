import {connect} from 'react-redux';
import {
  updateTaskFromFirebase,
  deleteTaskFromFirebase,
} from './firebase';

const List = ({tasks,updateTask,deleteTask})=>{

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
              updateTask(index,tasks);
            }}
            onDoubleClick={() => {
              deleteTask(index,tasks);
            }}
          >
            {task.name}
          </li>
        ));
      };


return <ul className="list-group">{getTasks()}</ul>

}

const taskUpdate = (i,tasks, dispatch) => {
  const updatedTask = { ...tasks[i], completed: !tasks[i].completed };
  updateTaskFromFirebase(updatedTask, i).then(() => {
    console.log('updated', updatedTask.id);
    const allTasks = [...tasks];
    allTasks.splice(i, 1, updatedTask);
    dispatch({type:'SET_LIST',payload:allTasks})
  });
};
const taskDelete = (i,tasks,dispatch) => {
  deleteTaskFromFirebase(tasks[i]).then(() => {
    console.log('deleted', tasks[i].id);
    dispatch({type:'SET_LIST',payload:tasks.filter((t) => t.id !== tasks[i].id)})
  });
};


const mapStateToProps = (state)=>{
  return {tasks: state.tasks}
}

const mapDispatchToProps = (dispatch)=>{
  return {
    updateTask: (index,tasks)=>{
       taskUpdate(index,tasks,dispatch)
   },
   deleteTask: (index,tasks)=>{
       taskDelete(index,tasks,dispatch)
}
}
}

export default connect(mapStateToProps,mapDispatchToProps)(List)