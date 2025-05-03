import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IngredientsSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const gotoBackPage = () => navigate(-1);
  return (
    <div>
      <Button
        startIcon={<ArrowBackIosIcon />}
        sx={{ fontSize: 'clamp(0.8rem, 5vw, 1.8rem)' }}
        onClick={gotoBackPage}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          sx={{
            fontSize: 'clamp(0.8rem, 5vw, 1.8rem)',
          }}
        >
          바코드검색
        </Typography>
      </div>
    </div>
  );
};

export default IngredientsSearch;
