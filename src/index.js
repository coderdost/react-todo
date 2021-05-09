import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "XXXXXXXXXX",
  authDomain: "XXXXX",
  projectId: "XXXX-XXXXXXXfirebase-XXX-XX",
  storageBucket: "XXX-XXXXX-XXXX.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXX",
  measurementId: "XXXXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App db={db} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
