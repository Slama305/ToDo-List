import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './Verification';
import '../App.css';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const inputRef = useRef();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (user) {
          const response = await axios.get(`http://localhost:3000/todos?userId=${user.id}`);
          setTodos(response.data);
        }
      } catch (error) {
        setError('Failed to fetch todos.');
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, [user]);

  const handleAdd = async () => {
    const task = inputRef.current.value.trim();
    if (!task) return;
    const newItem = { completed: false, task, userId: user.id };
    try {
      const response = await axios.post('http://localhost:3000/todos', newItem);
      setTodos([...todos, response.data]);
      inputRef.current.value = '';
    } catch (error) {
      setError('Failed to add todo.');
      console.error('Failed to add todo:', error);
    }
  };

  const handleDone = async (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const updatedItem = newTodos.find(todo => todo.id === id);
    try {
      await axios.put(`http://localhost:3000/todos/${updatedItem.id}`, updatedItem);
      setTodos(newTodos);
    } catch (error) {
      setError('Failed to update todo.');
      console.error('Failed to update todo:', error);
    }
  };

  const handleDel = async (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(newTodos);
    } catch (error) {
      setError('Failed to delete todo.');
      console.error('Failed to delete todo:', error);
    }
  };

  const filteredTodos = showCompleted ? todos.filter(todo => todo.completed) : todos.filter(todo => !todo.completed);

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do List</h1>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>
      {error && <div className="error">{error}</div>}
      <div className="box container">
        <div className="tasks-container">
          <ul className="tasks-list">
            {filteredTodos.map(({ task, completed, id }) => (
              <li key={id} className={`task-item ${completed ? 'done' : ''}`}>
                <span onClick={() => handleDone(id)}> {task}</span>
                <button className="delete-button" onClick={() => handleDel(id)}><MdDelete /></button>
              </li>
            ))}
          </ul>
        </div>
        <div className="input-container">
          <input className="task-input" type="text" ref={inputRef} placeholder="Add new task" />
          <button className="add-button" onClick={handleAdd}><FaPlus /></button>
        </div>
        <hr />
        <div className="filter-buttons">
          <button className={`filter-button ${showCompleted ? '' : 'active'}`} onClick={() => setShowCompleted(false)}>Show Incomplete</button>
          <button className={`filter-button ${showCompleted ? 'active' : ''}`} onClick={() => setShowCompleted(true)}>Show Completed</button>
        </div>
      </div>
    </div>
  );
}
