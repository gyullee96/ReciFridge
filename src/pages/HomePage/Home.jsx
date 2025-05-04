import React from 'react';
import { useNavigate } from 'react-router-dom';
import keywordData from '../../../keyword.json';
import NavFooter from '../../common/NavFooter';
import { getIngredients } from '../../utils/localStorageHelper';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const ingredients = getIngredients();

  const calculateDday = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const mergedIngredients = ingredients.map((item) => {
    const keywordMatch = keywordData.keyword_db.find((el) => el.id === item.id);
    return {
      ...item,
      icon: keywordMatch?.icon || '',
      keyword: keywordMatch?.keyword || '',
    };
  });
  const ingredientBanner = mergedIngredients.slice(0, 3);
  const expiringSoon = [...mergedIngredients]
    .sort((a, b) => new Date(a.expiration) - new Date(b.expiration))
    .slice(0, 6);

  return (
    <div className="page-container">
      <div className="refridge-border">
        <div className="main-top">
          <div>
            <img src="/fridge-main.png" alt="" className="refridge-main" />
          </div>
          <div className="main-logo">ReciFridge</div>
        </div>
        <div className="content">
          <div className="ingredient" onClick={() => navigate('/status')}>
            <div style={{ fontWeight: 500, marginBottom: '1rem' }}>
              My Fridge : {ingredients?.length} Items
            </div>
            <ul className="status-list">
              {ingredientBanner.map((item) => (
                <li key={item.id} className="status-list-li">
                  <img src={item.icon} />
                  <div>{item.keyword}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="expiration">
            <div style={{ fontWeight: 600, marginBottom: '1rem' }}>
              소비기한 임박
            </div>
            <ul className="expiration-list">
              {expiringSoon.map((item) => {
                const dDay = calculateDday(item.expiration);
                const dDayText =
                  dDay > 0
                    ? `D-${dDay}`
                    : dDay === 0
                      ? 'Today!'
                      : `D+${Math.abs(dDay)}`;
                return (
                  <li key={`exp-${item.id}`}>
                    <span className="expiration-list-ingre-info">
                      <img src={item.icon} alt={item.keyword} />
                      <div>{item.keyword}</div>
                    </span>
                    <div>{dDayText}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="main-bottom">
          <NavFooter />
        </div>
      </div>
    </div>
  );
};

export default Home;
