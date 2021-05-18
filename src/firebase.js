import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBW0tReb4C0uKF-VvQB-kMvlUlzgNa15Dc',
  authDomain: 'react-firebase-demo-d4b59.firebaseapp.com',
  projectId: 'react-firebase-demo-d4b59',
  storageBucket: 'react-firebase-demo-d4b59.appspot.com',
  messagingSenderId: '293683410356',
  appId: '1:293683410356:web:b2090b774c60af4b086ee1',
  measurementId: 'G-ZX87SBXLJM',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const addTasksToFirebase = (task) => {
  const taskRef = db.collection('tasks').doc();
  const newTask = { ...task, id: taskRef.id, time: new Date() };
  return new Promise((resolve)=>{
    taskRef.set(newTask).then(()=>{
        resolve({task:newTask,doc:taskRef});
    })
  })
  
};

const deleteTaskFromFirebase = (task) => {
  const taskRef = db.collection('tasks').doc(task.id);

  return taskRef.delete()
};

const updateTaskFromFirebase = (task, i) => {
  const taskRef = db.collection('tasks').doc(task.id);
  return taskRef.update(task)
};

const getTasksByName = (search) =>
  db.collection('tasks').where('name', '==', search).get();
const getTasksByCompleted = (status) =>
  db.collection('tasks').where('completed', '==', status).get();
const getTasksBySorting = (sortOption, limit) =>
  db.collection('tasks').orderBy(sortOption).limit(limit).get();

const getTasksNext = (sortOption, limit, lastDoc) =>
  db.collection('tasks').orderBy(sortOption).startAfter(lastDoc).limit(limit).get();

const getTasksPrev = (sortOption, limit, firstDoc) =>
  db
    .collection('tasks')
    .orderBy(sortOption)
    .endBefore(firstDoc)
    .limitToLast(limit).get();

const getTasksPrevLast = (sortOption, limit, lastDoc) =>
    db
      .collection('tasks')
      .orderBy(sortOption)
      .endAt(lastDoc)
      .limitToLast(limit).get();

export {
  addTasksToFirebase,
  updateTaskFromFirebase,
  deleteTaskFromFirebase,
  getTasksByName,
  getTasksByCompleted,
  getTasksBySorting,
  getTasksNext,
  getTasksPrev,
  getTasksPrevLast
};
