import React, { useState, useEffect, useContext, useCallback } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";

const Home = () => {
  const appContext = useContext(AppContext);
  const [tempArray, setArray] = useState();
  const db = firebase.firestore();

  const loadMessages = useCallback(() => {
    db.collection("messages")
      .get()
      .then(function(querySnapshot) {
        const array = [];
        querySnapshot.forEach(function(doc) {
          var docRef = db.collection("users").doc(doc.data().userId);
          docRef.get().then(function(document) {
            const messageObject = {
              name: document.data().name,
              image: document.data().image,
              date: doc.data().date,
              content: doc.data().content
            };
            array.push(messageObject);
            setArray(array);
          });
        });
      });
    appContext.setMessagesArray(tempArray);
  });

  useEffect(() => {
    loadMessages();
  });

  return (
    <div className="home">
      <Form />
      {appContext.messagesArray !== undefined && <Posts />}
    </div>
  );
};

export default Home;
