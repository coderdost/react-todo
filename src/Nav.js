import {connect} from 'react-redux';

const Nav = ({goToPrev,goToNext,page})=>{
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


const mapStateToProps = (state)=>{
    return {page: state.page}
  }


const mapDispatchToProps = (dispatch)=>{
  return {
    goToPrev: ()=>{
      dispatch({type:'PREV'})
    },
    goToNext: ()=>{
      dispatch({type:'NEXT'})
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Nav)        