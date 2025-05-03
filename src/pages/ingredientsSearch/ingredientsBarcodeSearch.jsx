import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { React, useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';
import { useLocation, useNavigate } from 'react-router-dom';
import useBarcodeQuery from '../../hooks/useBarcodeQuery';
const ingredientsBarcodeSearch = () => {
  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const {
    data: productData,
    isLoading,
    error: queryError,
  } = useBarcodeQuery(barcode);

  const handleScan = (err, result) => {
    if (result) {
      const scannedBarcode = result.text;
      setBarcode(scannedBarcode);
      setIsScanning(false);
    } else {
      if (err) {
        console.error('Scan Error:', err);
      }
    }
  };

  const showScanner = () => {
    setIsScanning(true);
    setBarcode('');
  };

  const errorMessage = queryError
    ? queryError.message || '상품 정보를 가져오는 중 오류가 발생했습니다.'
    : null;
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const gotoBackPage = () => navigate(-1);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: '#fffaef',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Button
          startIcon={<ArrowBackIosIcon />}
          sx={{ fontSize: 'clamp(0.8rem, 5vw, 1.8rem)' }}
          onClick={gotoBackPage}
        />
        <Typography
          sx={{
            fontSize: 'clamp(0.8rem, 5vw, 1.8rem)',
          }}
        >
          바코드검색
        </Typography>
        <p>{barcode || '바코드를 스캔해주세요.'}</p>
        {isScanning ? (
          <BarcodeScanner
            width={500}
            height={500}
            onUpdate={(err, result) => {
              handleScan(err, result);
            }}
          />
        ) : (
          <Button variant="contained" onClick={showScanner}>
            바코드 다시 읽기
          </Button>
        )}

        {isLoading && <p>로딩 중...</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {productData && (
          <div>
            <h3>상품 정보:</h3>
            <pre>{JSON.stringify(productData, null, 2)}</pre>
          </div>
        )}
      </Box>
    </div>
  );
};

export default ingredientsBarcodeSearch;
