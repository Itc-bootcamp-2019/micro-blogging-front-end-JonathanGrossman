import React, { useState, useEffect, useCallback, useContext } from "react";
import AppContext from "../context/AppContext.js";
import firebase from "../lib/firebase";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../components/Spinner";

const Posts = props => {
  const appContext = useContext(AppContext);
  const db = firebase.firestore();
  const { lastDocument, setLastDocument } = props;
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  const sortedMessagesArray = array => {
    return array.sort((a, b) => b.date - a.date);
  };

  const mapMessagesToAuthors = (doc, snapshot) => {
    var docRef = db.collection("users").doc(doc.data().userId);
    docRef.get().then(function(document) {
      const messageObject = {
        name: document.data().name,
        image: document.data().image,
        date: doc.data().date,
        content: doc.data().content
      };
      if (!appContext.messagesArray.includes(messageObject)) {
        appContext.setMessagesArray(prevArray => [...prevArray, messageObject]);
      }
      var lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDocument(lastVisible);
      setHasMoreMessages(true);
    });
  };

  const loadMoreMessages = useCallback(() => {
    if (lastDocument !== undefined && hasMoreMessages) {
      setHasMoreMessages(false);
      db.collection("messages")
        .orderBy("date", "desc")
        .startAfter(lastDocument)
        .limit(20)
        .get()
        .then(function(snapshot) {
          snapshot.docs.map(doc => {
            mapMessagesToAuthors(doc, snapshot);
          });
        });
    }
  });

  return (
    <div className="posts">
      {appContext.messagesArray !== null && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreMessages}
          hasMore={hasMoreMessages}
          loader={
            <div className="loader" key={0}>
              <Spinner />
            </div>
          }
        >
          {sortedMessagesArray(appContext.messagesArray).map(message => {
            const arrayToScreenForDuplicates = [];
            if (!arrayToScreenForDuplicates.includes(message.id)) {
              arrayToScreenForDuplicates.push(message.id);
              const displayDate = new Date(message.date).toISOString();
              return (
                <div key={message.id} className="posted-message">
                  <div className="message-credentials">
                    <img
                      src={message.image}
                      alt="user"
                      className="message-photo"
                    />
                    <div>{message.name}</div>
                    <div>{displayDate}</div>
                  </div>
                  {message.content}
                </div>
              );
            }
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Posts;
