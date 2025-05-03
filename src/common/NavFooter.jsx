import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeThumb from '../assets/barcode-thumb-bottom.png';
import './NavFooter.style.css';

const NavFooter = () => {
  const navigate = useNavigate();
  return (
    <nav className="nav-footer">
      <Button variant="text" onClick={() => navigate('/')}>
        <HomeIcon />
        <div>Home</div>
      </Button>
      <Button variant="text" onClick={() => navigate('/ingredients/search')}>
        <SearchIcon />
        Keyword
      </Button>
      <Button variant="text" onClick={() => navigate('/ingredients/barcode')}>
        <img src={BarcodeThumb} alt="" style={{ width: '23.99px' }} />
        Barcode
      </Button>
    </nav>
  );
};
export default NavFooter;
