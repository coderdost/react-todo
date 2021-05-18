import { useEffect, useState } from 'react';
import List from '../List/List';
import Controls from '../Controls/Controls';
import Nav from '../Nav/Nav';
import {
  getTasksByName,
  getTasksByCompleted,
  getTasksBySorting,
  getTasksNext,
  getTasksPrev,
  getTasksPrevLast
} from '../../firebase';

import {pageSize} from '../../constants';

export default function TodoUI({ status, sortOption, filter, page, search, setList, firstDoc, lastDoc, setFirstDoc, setLastDoc }) {
  
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
      case 5:
        queryRef = getTasksPrevLast(sortOption,pageSize,lastDoc)  
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