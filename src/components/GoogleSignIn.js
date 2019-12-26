import React from "react";
import "firebase/auth";
import firebase from "../lib/firebase";


const GoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  
  const handleClick = e => {
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(function(resultSignIn) {
        var token = resultSignIn.credential.accessToken;
        // The signed-in user info.
        var user = resultSignIn.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return <button onClick={e => handleClick(e)}>Google Sign In</button>;
};

export default GoogleSignIn;
