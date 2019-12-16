import React, { useState } from "react";
import Form from "./Form";
import Posts from "./Posts";

const Home = () => {
  const [messagesArray, setMessagesArray] = useState(
    localStorage.getItem("microBlogMessages") || ""
  );

  const addMessageToArray = value => {
    console.log(value);
  };

  return (
    <div className="home">
      <Form addMessageToArray={addMessageToArray} />
      <Posts />
    </div>
  );
};

export default Home;
