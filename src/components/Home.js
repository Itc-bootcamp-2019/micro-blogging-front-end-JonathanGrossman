import React, { useState, useEffect } from "react";
import Form from "./Form";
import Posts from "./Posts";
import { getMessages, postMessage } from "../lib/api";

const Home = () => {
  const [isInputValid, setInputValidity] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // NOTE: THIS IS FOR LOCAL STORAGE OF MESSAGES
  // const [messagesArray, setMessagesArray] = useState(
  //   JSON.parse(localStorage.getItem("microBlogMessages")) || []
  // );

  const [messagesArray, setMessagesArray] = useState([]);

  useEffect(() => {
    getMessages().then(
      response =>
        response.status === 200 && setMessagesArray(response.data.tweets)
    );
  }, []);

  const addMessageToArray = value => {
    setInputValidity(false);
    setIsSpinning(true);
    postMessage(value).then(response => {
      if (response.status === 200) {
        setInputValidity(true);
        setIsSpinning(false);
      }
    });

    // NOTE: THIS IS FOR LOCAL STORAGE
    // let existingEntries = localStorage.getItem("microBlogMessages");
    // if (existingEntries !== null) {
    //   const newArray = [...JSON.parse(existingEntries), value];
    //   localStorage.setItem("microBlogMessages", JSON.stringify(newArray));
    // } else {
    //   localStorage.setItem("microBlogMessages", JSON.stringify([value]));
    // }
    // const updatedEntries = JSON.parse(
    //   localStorage.getItem("microBlogMessages")
    // );
    // setMessagesArray(updatedEntries);
  };

  return (
    <div className="home">
      <Form
        addMessageToArray={addMessageToArray}
        isInputValid={isInputValid}
        setInputValidity={setInputValidity}
        isSpinning={isSpinning}
      />
      {messagesArray !== undefined && (
        <Posts
          messagesArray={messagesArray}
          isInputValid={isInputValid}
          setInputValidity={setInputValidity}
        />
      )}
    </div>
  );
};

export default Home;
