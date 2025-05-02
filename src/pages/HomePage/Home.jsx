import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="refridge-border">
      <div className="main-top">
        <div>
          <img src="/fridge-main.png" alt="" className="refridge-main" />
        </div>
        <div className="main-logo">ReciFridge</div>
      </div>
      <div className="ingredient">
        <div>My items: 18</div>
        <div>
          <img src="/tomato.png" alt="" />
          <img src="/lettuce.png" alt="" />
          <img src="/egg.png" alt="" />
        </div>
      </div>
      <div className="expiration">
        <div>소비기한 임박</div>
        <div>우유 아이콘--- 우유----- D-3</div>
        <div>달걀 아이콘--- 달걀----- D-5</div>
        <div>토마토 아이콘--- 토마토---- D-7</div>
      </div>
      <div className="main-bottom">
        <div className="home">
          <img src="/home-icon.png" alt="" />
          <div>Home</div>
        </div>
        <div className="Add">
          <img src="/add-icon.png" alt="" />
          <div>Add</div>
        </div>
        <div className="Recipes">
          <img src="/recipes-icon.png" alt="" />
          <div>Recipes</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
