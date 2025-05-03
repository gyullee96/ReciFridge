import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import Button from '@mui/material/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keywordData from '../../../keyword.json';
import NavFooter from '../../common/NavFooter';
import globalStore from '../../store/globalStore';
import './IngredientsStatus.style.css';

const IngredientsStatus = () => {
  // console.log('keywordData?', keywordData);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openedInfos, setOpenedInfos] = useState([]);

  const ingredients = globalStore((state) => state.ingredients);
  // keyword.json의 데이터를 id로 매핑
  const keywordMap = keywordData.keyword_db.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  // ingredients의 각 항목에 keyword 정보 붙이기
  const mapped = ingredients.map((ingredient) => ({
    ...ingredient,
    ...keywordMap[ingredient.id],
  }));

  const removeIngredient = globalStore((state) => state.removeIngredient);

  const filteredItems = mapped
    .filter((item) =>
      item.keyword.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => new Date(a.expiration) - new Date(b.expiration));

  const handleSelect = (id) => {
    // info layer가 열려있으면 클릭 무시
    if (openedInfos.includes(id)) return;
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

  const handleInfo = (index) => {
    setOpenedInfos(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // 이미 열려 있으면 닫기
          : [...prev, index], // 아니면 열기
    );
  };

  useEffect(() => {
    console.log('담겨있는재료', selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    console.log('스토어에서 가져온 ingredients:', ingredients);
  }, [ingredients]);

  function LongPressItem({ onClick, onLongPress, children, className }) {
    const timerRef = useRef(null);
    const isLongPress = useRef(false);

    const handleMouseDown = () => {
      isLongPress.current = false;
      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress(); // 길게 누름 감지
      }, 600); // 600ms 이상이면 길게 누름으로 인식
    };

    const handleMouseUp = () => {
      clearTimeout(timerRef.current);
      if (!isLongPress.current) {
        onClick(); // 짧게 누르면 일반 클릭
      }
    };

    return (
      <li
        className={className}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {children}
      </li>
    );
  }

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
              냉장고에 담겨있는 재료가 없습니다.
            </p>
          ) : (
            <ul className="status-list">
              {filteredItems.map((item) => {
                const { text, className } = getDDayInfo(item.expiration);
                return (
                  <LongPressItem
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    onLongPress={() => handleInfo(item.id)}
                    className={`${className} ${selectedItems.includes(item.id) ? 'li-selected' : ''}`}
                  >
                    <span className={className}>{text}</span>
                    <img src={item.icon} alt={item.keyword} />
                    <div className="ingredients-name">{item.keyword}</div>
                    <div
                      className={`layer-info ${openedInfos.includes(item.id) ? 'show' : ''}`}
                    >
                      <div>재고수량 : {item.count}개</div>
                      <div>
                        유통기한 :
                        <br />
                        {item.expiration}
                      </div>
                    </div>
                  </LongPressItem>
                );
              })}
            </ul>
          )}
        </div>
        {selectedItems.length > 0 && (
          <div className="go-recipe">
            <Button
              variant="contained"
              onClick={() => {
                let selectedIngredients = [];
                selectedItems.map((idx) => {
                  selectedIngredients.push(keywordMap[idx]);
                })
                return navigate('/recipe', {
                  state: { selectedIngredients }
                })
              }}
            >
              레시피 보기
            </Button>
            <Button
              className="button-delete"
              variant="contained"
              onClick={() => {
                removeIngredient(selectedItems);
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
