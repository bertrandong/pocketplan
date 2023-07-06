import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import TodoPage from './Pages/TodoPage';
import Sidebar from './Sidebar';
import ReactBigCalendar from './Pages/calendar/Calendar'
import Analytics from './Pages/Analytics';
import About from './Pages/About';
import './Home.css';

const Home = () => {
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
};

export default Home;