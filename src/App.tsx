import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import Home from './pages/Home';
import './components/styles.css';
import { IdleTimeoutComponent } from './components/useIdleTimeout';

const App: React.FC = () => {
   return (
      <Router>
         {/* <IdleTimeoutComponent timeout={5 * 6 * 1000} /> */}
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
