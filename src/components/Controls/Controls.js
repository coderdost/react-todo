import {connect} from 'react-redux';
import {
  addTasksToFirebase,
} from '../../firebase';
import ControlsUI from './ControlsUI';

const taskAdd = (t,dispatch) => {
  if (t) {
    addTasksToFirebase({ name: t, completed: false }).then((data) => {
        dispatch({ type: 'SET_LAST', payload: data.doc });
        dispatch({type:'ADD',payload:data.task})
    });
  } else {
    alert('enter valid value');
  }
};


const mapStateToProps = (state)=>{
  return {task: state.task, search:state.search}
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addTask: (task)=>{
       taskAdd(task, dispatch)
   },
   setTask:(task)=>{
    dispatch({type:'SET_TASK',payload:task})
   },
   sortTask:(option)=>{
     dispatch({type:'SORT',payload:option})
   },
   searchByStatus:(status)=>{
    dispatch({type:'SEARCH_STATUS',payload:status})
  },
   searchTask:(search)=>{
    dispatch({type:'SEARCH',payload:search})
  }
  
}
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlsUI)