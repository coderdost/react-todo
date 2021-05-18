import { createStore } from 'redux';
import { pageSize } from './constants';

const defaultValues = {
  tasks: [],
  task: { name: '', completed: false },
  sortOption: 'time',
  search: '',
  status: false,
  filter: 2,
  page: 1,
};
const reducer = (state = defaultValues, action) => {
  switch (action.type) {
    case 'SET_TASK':
      return { ...state, task: action.payload };
    case 'SET_LIST':
      return { ...state, tasks: action.payload };
    case 'SET_FIRST':
      return { ...state, firstDoc: action.payload }; 
    case 'SET_LAST':
        return { ...state, lastDoc: action.payload };      
    case 'ADD':
      if (state.tasks.length == pageSize) {
        alert('task added to last page');
        return {
          ...state,
          task: { name: '', completed: false },
        };
      }
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        task: { name: '', completed: false },
      };
    case 'SORT':
      return { ...state, sortOption: action.payload, filter: 2 };
    case 'SEARCH':
      return { ...state, search: action.payload, filter: 0 };
    case 'SEARCH_STATUS':
      return { ...state, status: action.payload, filter: 1 };
    case 'NEXT':
        if(state.tasks.length==pageSize){
            return { ...state, filter: 3, page: state.page + 1 };
        }
        else{
            return { ...state, filter: 3, page: state.page };
        }
    case 'PREV':
        if(state.tasks.length==0 && state.page>1){
            return { ...state, filter: 5, page: state.page - 1 };
        } else if(state.page>1){
            return { ...state, filter: 4, page: state.page - 1 };
        } else{
            return { ...state, filter: 4, page: state.page };
        }
      
    default:
      return state;
  }
};

export default createStore(reducer);
