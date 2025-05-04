import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keywordData from '../../../keyword.json';
import NavFooter from '../../common/NavFooter';
import {
  getIngredients,
  removeIngredients,
} from '../../utils/localStorageHelper';
import './IngredientsStatus.style.css';

const IngredientsStatus = () => {
  // console.log('keywordData?', keywordData);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  // keyword.json의 데이터를 id로 매핑
  const keywordMap = keywordData.keyword_db.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  // ingredients의 각 항목에 keyword 정보 붙이기
  const mapped = getIngredients().map((ingredient) => ({
    ...ingredient,
    ...keywordMap[ingredient.id],
  }));

  const filteredItems = mapped
    .filter((item) =>
      item.keyword.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => new Date(a.expiration) - new Date(b.expiration));

  const handleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id],
    );
  };

  const getDDayInfo = (targetDateStr) => {
    const targetDate = new Date(targetDateStr);
    const today = new Date();

    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));

    let text = '';
    let className = '';

    if (diffDays > 0) {
      text = `D-${diffDays}`;
    } else if (diffDays === 0) {
      text = `D-day`;
    } else {
      text = `D+${Math.abs(diffDays)}`;
    }

    if (diffDays < 0) {
      className = 'expired';
    } else if (diffDays <= 3) {
      className = 'warning';
    } else {
      className = '';
    }

    return { text, className };
  };

  useEffect(() => {
    console.log('담겨있는재료', selectedItems);
  }, [selectedItems]);

  return (
    <div className="ingredients-status-wrap">
      <div className="refrigerator-wrap">
        <div className="filter">
          <input
            type="text"
            placeholder="재료 찾기"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="refrigerator">
          {filteredItems.length < 1 ? (
            <p className="no-ingredients">
              <FreeBreakfastIcon sx={{ color: '#B6DDDA', fontSize: 54 }} />
              <br />
              재료가 없습니다.
            </p>
          ) : (
            <ul className="status-list">
              {filteredItems.map((item) => {
                const { text, className } = getDDayInfo(item.expiration);
                return (
                  <li
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`${className} ${selectedItems.includes(item.id) ? 'li-selected' : ''}`}
                  >
                    <span className={className}>{text}</span>
                    <img src={item.icon} alt={item.keyword} />
                    <div className="ingredients-name">{item.keyword}</div>
                    <div className="layer-info">
                      <div>
                        재고수량 <strong>{item.count}개</strong>
                      </div>
                      <div>
                        유통기한 <strong>{item.expiration.slice(2)}</strong>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {selectedItems.length > 0 && (
          <div className="go-recipe">
            <Button
              className="fade-in"
              variant="contained"
              onClick={() => {
                let selectedIngredients = [];
                selectedItems.map((idx) => {
                  selectedIngredients.push(keywordMap[idx]);
                });
                return navigate('/recipe', {
                  state: { selectedIngredients },
                });
              }}
            >
              레시피 보기
            </Button>
            <Button
              className="button-delete fade-in"
              variant="contained"
              onClick={() => {
                removeIngredients(selectedItems);
                setSelectedItems([]);
              }}
            >
              재료 삭제
            </Button>
          </div>
        )}
        <NavFooter />
      </div>
    </div>
  );
};
export default IngredientsStatus;
