export default ({task,search,setTask,addTask,sortTask,searchByStatus,searchTask})=>{
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
