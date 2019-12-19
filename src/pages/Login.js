import React from "react";
import { Formik } from "formik";

const Login = () => (
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
          <div className="page-title">Login</div>
          <div className="page-subtitle">Welcome back</div>
          <form onSubmit={handleSubmit} className="form-input-wrapper">
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
            <button type="submit" disabled={isSubmitting} className="button">
              Login
            </button>
          </form>
        </div>
      )}
    </Formik>
  </div>
);

export default Login;
