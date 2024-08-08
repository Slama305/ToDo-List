import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verification = createContext();

export function useAuth() {
  return useContext(Verification);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.get(`http://localhost:3000/users?username=${username}`);
      if (response.data.length > 0) {
        const userData = response.data[0];
        if (userData.password === password) {
          setUser(userData);
          setError(null);
          navigate('/home');
        } else {
          setError('Incorrect password');
        }
      } else {
        setError('Account not available');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Login failed:', error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/users', { username, password });
      setUser(response.data);
      setError(null);
      navigate('/home');
    } catch (error) {
      setError('Registration failed');
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Verification.Provider value={{ user, error, login, register, logout }}>
      {children}
    </Verification.Provider>
  );
}
