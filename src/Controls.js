import {connect} from 'react-redux';
import {
  addTasksToFirebase,
} from './firebase';

const Controls = ({task,search,setTask,addTask,sortTask,searchByStatus,searchTask})=>{
    return (
        <>
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
      <br></br>
      <button
        className="btn btn-warning"
        onClick={() => {
          searchByStatus(true);
        }}
      >
        Show Completed
      </button>
      <button
        className="btn btn-warning"
        onClick={() => {
          searchByStatus(false);
        }}
      >
        Show UnCompleted
      </button>
      <br></br>
      <input
        className="form-control"
        type="text"
        onChange={(e) => {
          searchTask(e.target.value);
        }}
        value={search}
        placeholder="search the task"
      ></input>
        </>
    )
}

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

export default connect(mapStateToProps,mapDispatchToProps)(Controls)