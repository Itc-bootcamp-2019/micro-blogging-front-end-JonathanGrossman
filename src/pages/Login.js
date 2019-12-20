import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Formik } from "formik";
import firebase from "../lib/firebase";
import "firebase/auth";
import { AuthContext } from "../auth/Auth";
import AppContext from "../context/AppContext";
import GoogleLogin from "react-google-login";

const Login = ({ history }) => {
  const appContext = useContext(AppContext);
  const currentUser = useContext(AuthContext);
  const setCurrentUser = useContext(AuthContext);

  const createNewUser = profile => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("users")
      .add(profile)
      .then(function(docRef) {})
      .catch(function(error) {});
  };
  const responseGoogle = response => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (response.profileObj !== undefined) {
            if (response.profileObj.email === doc.data().email) {
              appContext.setUserName(doc.data().name);
              appContext.setUserEmail(doc.data().email);
              // setCurrentUser;
              history.push("/");
              return;
            } else {
              createNewUser(response.profileObj);
              appContext.setUserName(response.profileObj.name);
              appContext.setUserEmail(response.profileObj.email);
              // setCurrentUser();
              history.push("/");
            }
          }
        });
      });
  };

  if (currentUser) {
    // firebase.auth().signOut();
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
          setTimeout(() => {
            const db = firebase.firestore();
            firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(
                db
                  .collection("users")
                  .get()
                  .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                      if (values.email === doc.data().email) {
                        appContext.setUserName(doc.data().name);
                        appContext.setUserEmail(doc.data().email);
                        setCurrentUser();
                        history.push("/");
                        return;
                      }
                    });
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
              </div>
              <button type="submit" disabled={isSubmitting} className="button">
                Login
              </button>
            </form>
          </div>
        )}
      </Formik>
      Login with Google
      <GoogleLogin
        clientId="518301849504-dkflm31p6b2692tb8n5052huqrhujnsa.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default withRouter(Login);
