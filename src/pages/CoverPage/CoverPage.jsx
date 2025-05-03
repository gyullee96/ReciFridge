import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverPage.css';

const coverPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="coverpage">
      <h1>Welcome to ReciFridge</h1>
      <img
        src="/fridge-cover.png"
        alt=""
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <div>Tap to open</div>
    </div>
  );
};

export default coverPage;
