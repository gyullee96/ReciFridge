import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavFooter.style.css';
import SearchIcon from '@mui/icons-material/Search';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

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
        <ViewWeekIcon />
        Barcode
      </Button>
    </nav>
  );
};
export default NavFooter;
