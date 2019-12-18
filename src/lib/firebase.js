import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAnVx0KuZPUAymjo7W2nck-qn7I3SVAugk",
  authDomain: "portfolio-641ec.firebaseapp.com",
  databaseURL: "https://portfolio-641ec.firebaseio.com",
  projectId: "portfolio-641ec",
  storageBucket: "portfolio-641ec.appspot.com",
  messagingSenderId: "85057278836",
  appId: "1:85057278836:web:d355ba84c027927d5b1221",
  measurementId: "G-5X6D74LQR6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
