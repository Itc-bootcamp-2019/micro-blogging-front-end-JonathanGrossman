import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppContext from "./context/AppContext";
import firebase from "./lib/firebase";
import AuthProvider from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthContext } from "./auth/Auth";
import "./App.css";

function App() {
  const [signedInUser, setSignedInUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
  const successMessage = "User Name updated!";
  const currentUser = useContext(AuthContext);

  const updateLocalStorage = () => {
    // if (userName !== "") {
    //   setIsUpdatingName(true);
    //   setTimeout(function() {
    //     setIsUpdatingName(false);
    //     setShowAlert(true);
    //     toggleAlert();
    //   }, 3000);
    //   localStorage.setItem("microBlogUserName", userName);
    // } else if (userName === "") {
    //   setIsError(true);
    //   setTimeout(function() {
    //     setIsError(false);
    //   }, 3000);
    // }
  };

  const toggleAlert = () => {
    setTimeout(function() {
      setShowAlert(false);
    }, 3000);
  };

  const addMessageToArray = value => {
    setInputValidity(false);
    setIsSpinning(true);
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("messages")
      .add(value)
      .then(function(docRef) {
        setInputValidity(true);
        setIsSpinning(false);
        setMessagesArray([...messagesArray], value);
      })
      .catch(function(error) {
        setIsError(true);
        setErrorMessage(error);
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

  // useEffect(() => {
  //   if (savedName === "undefined" || savedName === null) {
  //     setUserName("User Name");
  //   } else {
  //     setUserName(savedName);
  //   }
  // }, [currentUser, savedName]);

  return (
    <AuthProvider>
      <Router>
        <div>
          <nav className="navbar-wrapper">
            <div className="navbar">
              {signedInUser && (
                <NavLink
                  exact
                  to="/"
                  className="navbar-item"
                  activeClassName="selected"
                >
                  Home
                </NavLink>
              )}
              {signedInUser && (
                <NavLink
                  exact
                  to="/profile"
                  className="navbar-item"
                  activeClassName="selected"
                >
                  Profile
                </NavLink>
              )}
              {!signedInUser && (
                <NavLink
                  exact
                  to="/login"
                  className="navbar-item"
                  activeClassName="selected"
                >
                  Login
                </NavLink>
              )}
              {!signedInUser && (
                <NavLink
                  exact
                  to="/signup"
                  className="navbar-item"
                  activeClassName="selected"
                >
                  Signup
                </NavLink>
              )}
            </div>
          </nav>

          <Switch>
            <AppContext.Provider
              value={{
                signedInUser,
                setSignedInUser,
                userName,
                setUserName,
                userEmail,
                setUserEmail,
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
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/" component={Home} />
            </AppContext.Provider>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
