import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import List from './List';
import Controls from './Controls';
import Nav from './Nav';
import {
  getTasksByName,
  getTasksByCompleted,
  getTasksBySorting,
  getTasksNext,
  getTasksPrev,
} from './firebase';
import { connect } from 'react-redux';
import {pageSize} from './constants';
function App({ status, sortOption, filter, page, search, setList, firstDoc, lastDoc, setFirstDoc, setLastDoc }) {
  

  useEffect(() => {
    let queryRef;
    switch (filter) {
      case 0:
        queryRef = getTasksByName(search);
        break;
      case 1:
        queryRef = getTasksByCompleted(status);
        break;
      case 2:
        queryRef = getTasksBySorting(sortOption, pageSize);
        break;
      case 3:
        queryRef = getTasksNext(sortOption, pageSize, lastDoc);
        break;
      case 4:
        queryRef = getTasksPrev(sortOption, pageSize, firstDoc);
        break;
    }

    queryRef.then((querySnapshot) => {
      const allTasks = [];
      const allDocs = [];
      querySnapshot.forEach((doc) => {
        allTasks.push(doc.data());
        allDocs.push(doc);
      });
      if (allTasks.length) {
        setFirstDoc(allDocs[0]);
        setLastDoc(allDocs[allDocs.length - 1]);
        setList(allTasks);
      } else{
        setList([])
      }
    });
  }, [sortOption, search, status, filter, page]);

  return (
    <div className="App">
      <Controls></Controls>
      <List></List>
      <Nav></Nav>
    </div>
  );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
