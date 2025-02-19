import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTodos } from './TodoContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import Home from './pages/Home';
import { Link } from 'react-router-dom';
import './components/styles.css';
import useIdleTimeout from './components/useIdleTmeout';

const App: React.FC = () => {
   // useIdleTimeout(5 * 6 * 1000);
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
         </Routes>
      </Router>
   );
};

export default App;
