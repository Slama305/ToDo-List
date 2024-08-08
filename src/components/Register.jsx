import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './Verification';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required')
    }),
    onSubmit: async (values) => {
      await register(values.username, values.password);
    }
  });

  return (
    <div className='centerPage'>
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit} className="register-form">
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
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="switch-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register
