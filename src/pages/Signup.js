import React from "react";
import { Formik } from "formik";

const Signup = () => (
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
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
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
            <input
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className="auth-input"
            />
            {errors.username && touched.username && errors.username}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="auth-input"
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="auth-input"
            />
            {errors.password && touched.password && errors.password}
            <input
              type="password"
              name="confrmpassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmpassword}
              className="auth-input"
            />
            {errors.confirmpassword &&
              touched.confirmpassword &&
              errors.confirmpassword}
            <button type="submit" disabled={isSubmitting} className="button">
              Signup
            </button>
          </form>
        </div>
      )}
    </Formik>
  </div>
);

export default Signup;
