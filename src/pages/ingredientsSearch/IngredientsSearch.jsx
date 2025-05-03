/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keywordData from '../../../keyword.json';
import globalStore from '../../store/globalStore';
import '../ingredientsStatus/IngredientsStatus.style.css';
import './IngredientsSearch.style.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Drawer, Snackbar } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';

const IngredientsSearch = () => {
  const navigate = useNavigate();
  const gotoBackPage = () => navigate(-1);

  const [keywordsList, setKeywordsList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectItem, setSelectItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [date, setDate] = useState('');
  const [count, setCount] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const addIngredients = globalStore((state) => state.addIngredients);

  const handleSelect = (item) => {
    setIsDrawerOpen(true);
    setSelectItem(item);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    setKeywordsList(keywordData.keyword_db);
  }, []);

  useEffect(() => {
    console.log('selectItem?', selectItem);
  }, [selectItem]);

  const filteredItems = keywordsList.filter((item) =>
    item.keyword.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div className="ingredients-search-wrap">
      <div className="title-top">
        <Button
          startIcon={<ArrowBackIosIcon />}
          className="button-back"
          onClick={gotoBackPage}
        />
        Keyword Search
        <Button
          onClick={() => navigate('/ingredients/barcode')}
          className="button-barcode"
          title="바코드 검색"
        >
          <ViewWeekIcon />
        </Button>
      </div>
      <div className="filter">
        <input
          type="text"
          placeholder="재료 찾기"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <ul className="status-list">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={selectItem === item.id ? 'li-selected' : ''}
          >
            <img src={item.icon} alt={item.keyword} />
            <div className="ingredients-name">{item.keyword}</div>
          </li>
        ))}
      </ul>

      <hr className="hr-style" />
      <div className="bottom-button-wrap">
        <Button
          type="button"
          variant="contained"
          className="button-refrigerator"
          onClick={() => navigate('/status')}
        >
          나의 냉장고 보러가기
        </Button>
      </div>

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="input-box"
      >
        <div className="input-box-info filter">
          <div>
            <label>수량</label>
            <input
              type="number"
              placeholder="수량"
              min={1}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <div>
            <label>유통기한</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                placeholder="유통기한"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="button-add"
          onClick={() => {
            if (!selectItem || !date || !count) return;

            const item = keywordsList.find((k) => k.id === selectItem);

            addIngredients({
              id: item.id,
              name: item.keyword,
              count: count,
              expiration: date.toISOString().split('T')[0], // 날짜 형식 맞춤
              url: item.icon,
            });

            setSnackbarMessage(`${item.keyword} 재료를 담았습니다!`);
            setIsDrawerOpen(false); // 닫기
            setCount(1); // 초기화
            setDate('');
            setSelectItem(null);
            setOpenSnackbar(true);
          }}
        >
          재료 담기
        </Button>
      </Drawer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            color: '#2e7d32',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default IngredientsSearch;
