import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IngredientsStatus.style.css';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import globalStore from '../../store/globalStore';
import NavFooter from '../../common/NavFooter';

const IngredientsStatus = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openedInfos, setOpenedInfos] = useState([]);

  const ingredients = globalStore((state) => state.ingredients);
  const removeIngredient = globalStore((state) => state.removeIngredient);

  const filteredItems = ingredients
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
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

  const handleInfo = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
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
                  <img src={item.icon} alt={item.name} />
                  <div className="ingredients-name">{item.name}</div>
                  {openedInfos.includes(item.id) ? (
                    <CancelIcon
                      className={'button-info close'}
                      onClick={(e) => handleInfo(item.id, e)}
                    />
                  ) : (
                    <InfoIcon
                      className={'button-info'}
                      onClick={(e) => handleInfo(item.id, e)}
                    />
                  )}

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
                </li>
              );
            })}
          </ul>
        </div>
        {selectedItems.length > 0 && (
          <div className="go-recipe">
            <Button
              variant="contained"
              onClick={() =>
                navigate('/recipe', {
                  selectedItems: { selectedItems },
                })
              }
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
