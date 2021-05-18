export default ({goToPrev,goToNext,page})=>{
    return(<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <button
          class="page-link"
          onClick={() => {
            goToPrev();
          }}
        >
          Previous
        </button>
      </li>
      <li class="page-item">
        <button class="page-link">{page}</button>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          onClick={() => {
            goToNext();
          }}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>)
}