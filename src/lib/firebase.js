import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnVx0KuZPUAymjo7W2nck-qn7I3SVAugk",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "portfolio-641ec",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDsT4upNYwUwt6UthEa6jfdURx6221sVfg",
//   authDomain: "cdh1-a7b54.firebaseapp.com",
//   databaseURL: "https://cdh1-a7b54.firebaseio.com",
//   projectId: "cdh1-a7b54",
//   storageBucket: "cdh1-a7b54.appspot.com",
//   messagingSenderId: "1058476211610",
//   appId: "1:1058476211610:web:a24b868b0c5ca841d44e23"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
