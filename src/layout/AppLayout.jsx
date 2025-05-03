import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fffaef',
          height: '2rem',
          marginTop: '10px',
        }}
      >
        <Button
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            maxHeight: '100%',
            zIndex: 2,
          }}
          color="dark"
          startIcon=<ArrowBackIosIcon />
          onClick={() => navigate(-1)}
          cursor="true"
        ></Button>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Test
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
