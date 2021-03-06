// TO DO:

//// CHANGE READ / WRITE PERMISSIONS FOR STORAGE
//// CHANGE READ / WRITE PERMISSIONS FOR AUTH
//// CHANGE READ / WRITE PERMISSIONS FOR DATABASE
//// REAL-TIME UPDATES ON MESSAGE FEED

import React, { useState } from "react";
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
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [signedInUser, setSignedInUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
  const [profileImage, setProfileImage] = useState("");
  const [urlProfileImage, setUrlProfileImage] = useState("");
  const [reauthRequired, setReauthRequired] = useState(false);
  const [verifyOldEmail, setVerifyOldEmail] = useState(false);
  const successMessage = "Profile updated!";

  const updateUserName = () => {
    const user = firebase.auth().currentUser;
    if (!reauthRequired) {
      if (userName !== "") {
        setIsUpdatingName(true);
        setTimeout(function() {
          setIsUpdatingName(false);
          setShowAlert(true);
          toggleAlert();
        }, 3000);
        // UPDATES USER COLLECTION INFO
        const db = firebase.firestore();
        db.collection("users")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              if (user.email === doc.data().email)
                db.collection("users")
                  .doc(doc.data().id)
                  .update({ name: userName, email: userEmail });
            });
          });
        //UPDATES USER IN FIREBASE AUTHENTICATION
        user
          .updateProfile({ displayName: userName })
          .then(setUserName(userName))
          .catch();

        user
          .updateEmail(userEmail)
          .then(function() {
            setUserEmail(userEmail);
          })
          .catch(function(error) {
            if (error.code === "auth/requires-recent-login") {
              setReauthRequired(true);
            }
            // An error happened.
          });
      }
    } else if (userName === "" || userEmail === "") {
      setIsError(true);
      setTimeout(function() {
        setIsError(false);
      }, 3000);
    }
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
    db.collection("messages")
      .add(value)
      .then(function(docRef) {
        db.collection("messages")
          .doc(docRef.id)
          .update({ id: docRef.id });
        setInputValidity(true);
        setIsSpinning(false);
        if (!messagesArray.includes(value)) {
          setMessagesArray([...messagesArray], value);
        }
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
      addMessageToArray({ date, userId, content });
      setContent("");
    }
  };

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
                userId,
                setUserId,
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
                updateUserName,
                toggleAlert,
                applyThisClass,
                setApplyThisClass,
                profileImage,
                setProfileImage,
                urlProfileImage,
                setUrlProfileImage,
                reauthRequired,
                setReauthRequired,
                verifyOldEmail,
                setVerifyOldEmail
              }}
            >
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/reset-password" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Home} />
            </AppContext.Provider>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
