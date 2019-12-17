import React, { useState, useEffect } from "react";
import Form from "./Form";
import Posts from "./Posts";
import { getMessages } from "../lib/api";

const Home = () => {
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
    console.log(value);
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
      <Form addMessageToArray={addMessageToArray} />

      {messagesArray !== undefined && <Posts messagesArray={messagesArray} />}
    </div>
  );
};

export default Home;
