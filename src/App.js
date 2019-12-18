import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AppContext from "./context/AppContext.js";
import { getMessages, postMessage } from "./lib/api";

function App() {
  const [userName, setUserName] = useState("");
  const savedName = localStorage.getItem("microBlogUserName");
  const [isInputValid, setInputValidity] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [applyThisClass, setApplyThisClass] = useState("");
  const [buttonClass, setButtonClass] = useState(
    "message-button-home submit-button-off"
  );
  const successMessage = "User Name updated!"

  const updateLocalStorage = () => {
    setIsUpdatingName(true);
    setTimeout(function() {
      setIsUpdatingName(false);
      setShowAlert(true);
      toggleAlert();
    }, 3000);
    localStorage.setItem("microBlogUserName", userName);
  };

  const toggleAlert = () => {
    setTimeout(function() {
      setShowAlert(false);
    }, 3000);
  };

  const addMessageToArray = value => {
    setInputValidity(false);
    setIsSpinning(true);
    postMessage(value)
      .then(response => {
        if (response.status === 200) {
          setInputValidity(true);
          setIsSpinning(false);
          setMessagesArray([...messagesArray], value)
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

  const submitMessage = () => {
    if (isInputValid) {
      addMessageToArray({ date, userName, content });
      setContent("");
    }
  };

  useEffect(() => {
    if (savedName === "undefined" || savedName === null) {
      setUserName("User Name");
    } else {
      setUserName(savedName);
    }
  }, [savedName]);
  return (
    <Router>
      <div>
        <nav className="navbar-wrapper">
          <div className="navbar">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
          </div>
        </nav>

        <Switch>
          <AppContext.Provider
            value={{
              userName,
              setUserName,
              isInputValid,
              setInputValidity,
              isSpinning,
              setIsSpinning,
              isError,
              setIsError,
              errorMessage,
              setErrorMessage,
              successMessage,
              messagesArray,
              setMessagesArray,
              content,
              setContent,
              date,
              setDate,
              addMessageToArray,
              submitMessage,
              isUpdatingName,
              setIsUpdatingName,
              showAlert,
              setShowAlert,
              buttonClass,
              setButtonClass,
              updateLocalStorage,
              toggleAlert,
              applyThisClass,
              setApplyThisClass
            }}
          >
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </AppContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
