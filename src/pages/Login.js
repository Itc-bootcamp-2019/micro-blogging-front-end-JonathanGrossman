import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import firebase from "../lib/firebase";
import "firebase/auth";
import { AuthContext } from "../auth/Auth";
import AppContext from "../context/AppContext";
import Spinner from "../components/Spinner";
import GoogleSignIn from "../components/GoogleSignIn";

const Login = ({ history }) => {
  const appContext = useContext(AppContext);
  const currentUser = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const db = firebase.firestore();

  const checkUserExistsInCollection = userToValidate => {
    const usersArray = [];
    db.collection("users")
      .get()
      .then(function(querySnapshot) {
        const filteredUsersArray = [];
        querySnapshot.forEach(function(doc) {
          usersArray.push(doc.data().email);
          if (!usersArray.includes(userToValidate.email)) {
            signUpUser(userToValidate);
          }
          db.collection("users")
            .get()
            .then(function(usersSnapshot) {
              usersSnapshot.forEach(function(doc) {
                if (!filteredUsersArray.includes(doc.data())) {
                  filteredUsersArray.push(doc.data());
                }
              });
            });
        });
      });
  };

  const signUpUser = userToValidate => {
    setTimeout(() => {
      db.collection("users")
        .doc(userToValidate.uid)
        .set({
          name: userToValidate.displayName,
          email: userToValidate.email,
          image: userToValidate.photoURL,
          id: userToValidate.uid
        })
        .then(function(docRef) {
          appContext.setUserId(userToValidate.uid);
          appContext.setUserName(userToValidate.displayName);
          appContext.setUserEmail(userToValidate.email);
          setIsLoading(false);
          history.push("/");
        })
        .catch(function(error) {
          //handle error
        });
    }, 1000);
  };

  if (currentUser) {
    checkUserExistsInCollection(currentUser);
    appContext.setSignedInUser(currentUser);
    db.collection("users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (currentUser.email === doc.data().email) {
            appContext.setUserId(doc.data().id);
            appContext.setUserName(doc.data().name);
            appContext.setUserEmail(doc.data().email);
            appContext.setUrlProfileImage(doc.data().image);
          }
        });
      });
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);
          setTimeout(() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(setIsLoading(false), history.push("/"))
              .catch(
                function(error) {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ...
                },
                [history]
              );
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <div className="auth-page">
            <div className="page-title">Login</div>
            <div className="page-subtitle">Welcome back</div>
            <form onSubmit={handleSubmit} className="form-input-wrapper">
              <div className="input-and-error-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="auth-input"
                />
                <div className="input-error-alert">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="input-and-error-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="auth-input"
                />
                <div className="input-error-alert">
                  {errors.password && touched.password && errors.password}
                </div>
                <Link to="/reset-password" className="reset-password">
                  Forgot password?
                </Link>
              </div>
              <div className="buttons-wrapper">
                {isLoading && (
                  <div className="login-spinner">
                    <Spinner />
                  </div>
                )}
                {!isLoading && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button"
                  >
                    Login
                  </button>
                )}
                {!isLoading && <GoogleSignIn />}
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(Login);
