import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Dashboard from './Pages/Dashboard';
import TodoPage from './Pages/TodoPage';
import Sidebar from './Sidebar';
import ReactBigCalendar from './Pages/calendar/Calendar'
import Analytics from './Pages/Analytics';
import About from './Pages/About';
import './Home.css';

const Home = () => {
  const isLoggedIn = localStorage.getItem('token')
  if (isLoggedIn) {
    return (
      <div>
          <Sidebar>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todopage" element={<TodoPage />} />
            <Route path='/calendar' element={<ReactBigCalendar />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/about' element={<About />} />
          </Routes>
          </Sidebar>
      </div>
    );
  } else {
    return (
      <div>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/dashboard" element={<Login />} />
            <Route path="/todopage" element={<Login />} />
            <Route path='/calendar' element={<Login />} />
            <Route path='/analytics' element={<Login />} />
            <Route path='/about' element={<Login />} />
          </Routes>
      </div>
    );
  }
};

export default Home;