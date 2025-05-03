import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import NavFooter from '../../common/NavFooter';
import globalStore from '../../store/globalStore';

const Home = () => {
  const navigate = useNavigate();
  const { ingredients } = globalStore();

  const calculateDday = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="refridge-border">
      <div className="main-top">
        <div>
          <img src="/fridge-main.png" alt="" className="refridge-main" />
        </div>
        <div className="main-logo">ReciFridge</div>
      </div>
      <div className="ingredient" onClick={() => navigate('/status')}>
        <div>My items: 18</div>
        <ul>
          {ingredients.map((item) => (
            <li key={item.id}>
              ID: {item.id}, 유통기한: {item.expiration}, 개수: {item.count}
            </li>
            // 재료 아이콘 나오면 쓸 코드
            // <li key={item.id}>
            //   {item.icon}
            // </li>
          ))}
        </ul>
      </div>
      <div className="expiration">
        <div>소비기한 임박</div>
        <ul>
          {ingredients.map((item) => {
            const dDay = calculateDday(item.expiration);
            let dDayText = '';

            if (dDay > 0) {
              dDayText = `D-${dDay}`;
            } else if (dDay === 0) {
              dDayText = 'Today!';
            } else {
              dDayText = `D+${Math.abs(dDay)}`;
            }

            return (
              <li key={item.id}>
                아이콘자리 {item.count} {dDayText}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="main-bottom">
        <NavFooter />
      </div>
    </div>
  );
};

export default Home;
