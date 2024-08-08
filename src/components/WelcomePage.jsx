import React from 'react';
import { Link } from 'react-router-dom';
import './welcomeStyle.css';

const Welcomepage = () => {
  return (
    <div className='centerPage'>
      <div className="welcome-container">
        <h1 className='Welcome'>Organize Your Tasks Effortlessly</h1>
        <p>Get started by <Link to="/register">creating an account</Link> or <Link to="/login">signing in</Link> to access your to-do list.</p>
      </div>
    </div>
  );
};

export default Welcomepage;
