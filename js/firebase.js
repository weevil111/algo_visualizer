const firebaseConfig = {
  apiKey: "AIzaSyB9jQFqFPzNkmM9t5Mbj9GzP41gVym5Hh4",
  authDomain: "algorithm-visualizer-307a3.firebaseapp.com",
  projectId: "algorithm-visualizer-307a3",
  storageBucket: "algorithm-visualizer-307a3.appspot.com",
  messagingSenderId: "10901822490",
  appId: "1:10901822490:web:d0b807d4652b1beee4c5a3",
  measurementId: "G-N9Y5PXGCEH"
};

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var firebaseAuth = firebase.auth();