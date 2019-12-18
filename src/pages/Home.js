import React, { useEffect, useContext, useCallback } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { getMessages } from "../lib/api";
import AppContext from "../context/AppContext";

const Home = () => {
  const appContext = useContext(AppContext);

  const loadMessages = useCallback(() => {
    getMessages().then(
      response =>
        response.status === 200 &&
        appContext.setMessagesArray(response.data.tweets)
    );
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
