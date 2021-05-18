import '../../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import TodoUI from './TodoUI';

const mapStateToProps = (state) => {
  return {
    status: state.status,
    sortOption: state.sortOption,
    filter: state.filter,
    page: state.page,
    search: state.search,
    firstDoc: state.firstDoc,
    lastDoc: state.lastDoc
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setList: (list) => {
      dispatch({ type: 'SET_LIST', payload: list });
    },
    setFirstDoc:(doc)=>{
      dispatch({ type: 'SET_FIRST', payload: doc });
    },
    setLastDoc:(doc)=>{
      dispatch({ type: 'SET_LAST', payload: doc });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoUI);
