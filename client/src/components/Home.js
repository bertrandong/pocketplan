import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import TodoPage from './Pages/TodoPage';
import Sidebar from './Sidebar';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Sidebar>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todopage" element={<TodoPage />} />
      </Routes>
      </Sidebar>
    </div>
  );
};

export default Home;