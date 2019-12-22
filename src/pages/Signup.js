import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Formik } from "formik";
import firebase from "../lib/firebase";
import "firebase/auth";
import AppContext from "../context/AppContext";

import uuid from "uuidv4";

const Signup = ({ history }) => {
  const appContext = useContext(AppContext);
  const db = firebase.firestore();
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmpassword: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }

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

          if (!values.confirmpassword) {
            errors.confirmpassword = "Required";
          } else if (values.password !== values.confirmpassword) {
            errors.confirmpassword = "Must match password";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            firebase
              .auth()
              .createUserWithEmailAndPassword(values.email, values.password)
              .then(
                response =>
                  db.settings({
                    timestampsInSnapshots: true
                  }),
                db
                  .collection("users")
                  .add({ name: values.username, email: values.email })
                  .then(function(docRef) {
                    db.collection("users")
                      .doc(docRef.id)
                      .update({ id: docRef.id });
                    appContext.setUserName(values.setUserName);
                    appContext.setUserEmail(values.setUserEmail);
                    history.push("/");
                  })
                  .catch(function(error) {
                    //handle error
                  })
              )
              .catch(
                function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
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
            <div className="page-title">Signup</div>
            <div className="page-subtitle">Please enter your information</div>
            <form onSubmit={handleSubmit} className="form-input-wrapper">
              <div className="input-and-error-wrapper">
                <input
                  type="username"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className="auth-input"
                />
                <div className="input-error-alert">
                  {errors.username && touched.username && errors.username}
                </div>
              </div>
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
              </div>
              <div className="input-and-error-wrapper">
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmpassword}
                  className="auth-input"
                />
                <div className="input-error-alert">
                  {errors.confirmpassword &&
                    touched.confirmpassword &&
                    errors.confirmpassword}
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="button">
                Signup
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(Signup);
