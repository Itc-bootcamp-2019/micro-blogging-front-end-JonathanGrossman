import React, { useState } from "react";
import Form from "./Form";
import Posts from "./Posts";

const Home = () => {
  const [messagesArray, setMessagesArray] = useState(
    JSON.parse(localStorage.getItem("microBlogMessages")) || []
  );

  const addMessageToArray = value => {
    let existingEntries = localStorage.getItem("microBlogMessages");
    if (existingEntries !== null) {
      const newArray = [...JSON.parse(existingEntries), value];
      localStorage.setItem("microBlogMessages", JSON.stringify(newArray));
    } else {
      localStorage.setItem("microBlogMessages", JSON.stringify([value]));
    }

    const updatedEntries = JSON.parse(
      localStorage.getItem("microBlogMessages")
    );
    setMessagesArray(updatedEntries);
  };

  return (
    <div className="home">
      <Form addMessageToArray={addMessageToArray} />
      <Posts messagesArray={messagesArray} />
    </div>
  );
};

export default Home;
