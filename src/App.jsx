import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage/Home';
import CoverPage from './pages/CoverPage/CoverPage';

function App() {
  console.log('Running');
  return (
    <Routes>
      <Route path="/main" element={<Home />} />
      <Route path="/" element={<CoverPage />} />
    </Routes>
  );
}

export default App;
