import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage/Home';

function App() {
  console.log('Running');
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
