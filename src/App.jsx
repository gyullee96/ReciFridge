import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/HomePage/Home';
import CoverPage from './pages/CoverPage/CoverPage';

function App() {
  console.log('Running');
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/main" element={<Home />} />
    </Routes>
  );
}

export default App;
