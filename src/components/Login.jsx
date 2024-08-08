import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './Verification';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      await login(values.username, values.password);
    }
  });

  return (
    <div className='centerPage'>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={formik.touched.username && formik.errors.username ? 'input-error' : ''}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="switch-link">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
