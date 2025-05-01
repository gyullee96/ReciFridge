import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IngredientsStatus.style.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import globalStore from '../../store/globalStore';

const IngredientsStatus = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openedInfos, setOpenedInfos] = useState([]);

  const ingredients = globalStore((state) => state.ingredients);

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
            {filteredItems.map((item, index) => {
              const { text, className } = getDDayInfo(item.expiration);
              return (
                <li
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`${className} ${selectedItems.includes(index) ? 'li-selected' : ''}`}
                >
                  <span className={className}>{text}</span>
                  <img src={item.icon} alt={item.name} />
                  <div className="ingredients-name">{item.name}</div>
                  {openedInfos.includes(index) ? (
                    <CancelIcon
                      className={'button-info close'}
                      onClick={(e) => handleInfo(index, e)}
                    />
                  ) : (
                    <InfoIcon
                      className={'button-info'}
                      onClick={(e) => handleInfo(index, e)}
                    />
                  )}

                  <div
                    className={`layer-info ${openedInfos.includes(index) ? 'show' : ''}`}
                  >
                    <div>재고수량: {item.count}개</div>
                    <div>유통기한: {item.expiration}</div>
                    <div>구매일자: {item.registratioin}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {selectedItems.length > 0 && (
          <div className="go-recipe">
            <Button variant="contained" onClick={() => navigate('/recipe')}>
              선택한 재료의 레시피 보기
            </Button>
          </div>
        )}
        <nav className="nav-footer">
          <Button variant="text" onClick={() => navigate('/')}>
            <HomeIcon />
            <div>Home</div>
          </Button>
          <Button variant="text" onClick={() => navigate('/search')}>
            <AddCircleIcon />
            Add Item
          </Button>
          <Button variant="text" onClick={() => navigate('/recipe')}>
            <SettingsIcon />
            Recipes
          </Button>
        </nav>
      </div>
    </div>
  );
};
export default IngredientsStatus;
