import React, { useEffect, useContext, useCallback } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";

const Home = () => {
  const appContext = useContext(AppContext);

  const loadMessages = useCallback(() => {
    const db = firebase.firestore();
    db.collection("messages")
      .get()
      .then(function(querySnapshot) {
        const array = [];
        querySnapshot.forEach(function(doc) {
          const messageObject = {
            userName: doc.data().userName,
            date: doc.data().date,
            content: doc.data().content
          };
          array.push(messageObject);
        });
        appContext.setMessagesArray(array);
      });
    // setTimeout(function() {
    //   const db = firebase.firestore();
    //   db.collection("messages")
    //     .get()
    //     .then(function(querySnapshot) {
    //       const array = [];
    //       querySnapshot.forEach(function(doc) {
    //         const messageObject = {
    //           userName: doc.data().userName,
    //           date: doc.data().date,
    //           content: doc.data().content
    //         };
    //         array.push(messageObject);
    //       });
    //       appContext.setMessagesArray(array);
    //     });
    // }, 20000);
  });

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <div className="home">
      <Form />
      {appContext.messagesArray !== undefined && <Posts />}
    </div>
  );
};

export default Home;
