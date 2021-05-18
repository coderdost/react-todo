import {connect} from 'react-redux';
import {
  updateTaskFromFirebase,
  deleteTaskFromFirebase,
} from '../../firebase';
import ListUI from './ListUI';

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

export default connect(mapStateToProps,mapDispatchToProps)(ListUI)