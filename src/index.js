import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBW0tReb4C0uKF-VvQB-kMvlUlzgNa15Dc",
  authDomain: "react-firebase-demo-d4b59.firebaseapp.com",
  projectId: "react-firebase-demo-d4b59",
  storageBucket: "react-firebase-demo-d4b59.appspot.com",
  messagingSenderId: "293683410356",
  appId: "1:293683410356:web:b2090b774c60af4b086ee1",
  measurementId: "G-ZX87SBXLJM"
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
