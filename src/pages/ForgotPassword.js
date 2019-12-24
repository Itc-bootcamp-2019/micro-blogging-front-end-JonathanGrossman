import React, { useState, useContext } from "react";
import { Formik } from "formik";
import Spinner from "../components/Spinner";
import AppContext from "../context/AppContext";

const ForgotPassword = () => {
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);
          appContext.resetPassword(values.email);
          setTimeout(() => {
            setIsLoading(false);
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
            <div className="page-title">Forgot Password</div>
            <div className="page-subtitle">We got you covered.</div>
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
                  Submit
                </button>
              )}
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
