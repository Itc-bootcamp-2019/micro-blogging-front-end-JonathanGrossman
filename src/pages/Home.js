import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { getMessages, postMessage } from "../lib/api";

const Home = props => {
  const { userName } = props;
  const [isInputValid, setInputValidity] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    getMessages().then(
      response =>
        response.status === 200 && setMessagesArray(response.data.tweets)
    );
  };

  const addMessageToArray = value => {
    setInputValidity(false);
    setIsSpinning(true);
    postMessage(value)
      .then(response => {
        if (response.status === 200) {
          setInputValidity(true);
          setIsSpinning(false);
          loadMessages();
        }
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data);
        setTimeout(function() {
          setIsError(false);
          setIsSpinning(false);
          setInputValidity(false);
          setErrorMessage("");
        }, 3000);
      });
  };

  return (
    <div className="home">
      <Form
        addMessageToArray={addMessageToArray}
        isInputValid={isInputValid}
        setInputValidity={setInputValidity}
        isSpinning={isSpinning}
        isError={isError}
        errorMessage={errorMessage}
        userName={userName}
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
