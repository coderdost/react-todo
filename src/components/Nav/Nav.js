import {connect} from 'react-redux';
import NavUI from './NavUI';

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


export default connect(mapStateToProps,mapDispatchToProps)(NavUI)        