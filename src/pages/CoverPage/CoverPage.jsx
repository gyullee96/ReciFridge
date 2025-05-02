import React from 'react';
import './CoverPage.css';
import { useNavigate } from 'react-router-dom';

const coverPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main');
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
