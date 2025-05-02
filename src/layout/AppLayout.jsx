import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fffaef' }}>
                <Button
                    variant="contained"
                    color="dark"
                    startIcon=<ArrowBackIosIcon />
                    onClick={() => navigate(-1)}
                ></Button>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: 'center' }} >
                    Test
                </div>
            </div>
            <Outlet />
        </div >
    )
}

export default AppLayout;
