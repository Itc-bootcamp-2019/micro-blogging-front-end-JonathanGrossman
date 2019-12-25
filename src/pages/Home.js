import React, { useState, useEffect, useContext, useCallback } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";

const Home = () => {
  const appContext = useContext(AppContext);
  const [lastDocument, setLastDocument] = useState();
  const db = firebase.firestore();

  const loadMessages = useCallback(() => {
    db.collection("messages")
      .orderBy("date", "desc")
      .limit(10)
      .get()
      .then(function(snapshot) {
        snapshot.docs.map(doc => {
          let docRef = db.collection("users").doc(doc.data().userId);
          docRef.get().then(function(document) {
            const messageObject = {
              name: document.data().name,
              image: document.data().image,
              date: doc.data().date,
              content: doc.data().content,
              id: doc.data().id
            };
            appContext.setMessagesArray(prevArray => [
              ...prevArray,
              messageObject
            ]);
          });
        });
        let lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastDocument(lastVisible);
      });
  });

  // function handleSnapshot(snapshot) {
  //   const array = [];
  //   snapshot.docs.map(doc => {
  //     let docRef = db.collection("users").doc(doc.data().userId);
  //     docRef.get().then(function(document) {
  //       const messageObject = {
  //         name: document.data().name,
  //         image: document.data().image,
  //         date: doc.data().date,
  //         content: doc.data().content,
  //         id: doc.data().id
  //       };
  //       array.push(messageObject);
  //       setTempArray(array);
  //     });
  //   });
  //   appContext.setMessagesArray(tempArray);
  //   let lastVisible = snapshot.docs[snapshot.docs.length - 1];
  //   setLastDocument(lastVisible);
  // }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="home">
      <Form />
      {appContext.messagesArray !== undefined && (
        <Posts lastDocument={lastDocument} setLastDocument={setLastDocument} />
      )}
    </div>
  );
};

export default Home;
