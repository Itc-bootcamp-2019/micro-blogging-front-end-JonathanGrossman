import React, { useEffect, useState } from "react";
import firebase from "../lib/firebase";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={(currentUser, setCurrentUser)}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
