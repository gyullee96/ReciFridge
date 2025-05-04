import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverPage.css';

const coverPage = () => {
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsZooming(true);

    // 애니메이션 시간 후에 페이지 이동 (ex: 1초)
    setTimeout(() => {
      navigate('/home');
    }, 1000); // 이 시간은 CSS 애니메이션 시간과 맞춰야 함
  };

  return (
    <div className="coverpage-wrap">
      <div className="coverpage">
        <h1 className="welcome">Welcome to ReciFridge</h1>
        <img
          src="/fridge-cover-remove.png"
          alt=""
          onClick={handleClick}
          className={`fridge-img ${isZooming ? 'zoom' : ''}`}
          style={{ cursor: 'pointer' }}
        />
        <div className="tap">Tap to open</div>
      </div>
    </div>
  );
};

export default coverPage;
