import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { React, useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';
import { useNavigate } from 'react-router-dom';
import useBarcodeQuery from '../../hooks/useBarcodeQuery';
import IngredientsBarcodeResult from './IngredientsBarcodeResult';
import './IngredientsBarcodeSearch.style.css';

const IngredientsBarcodeSearch = () => {
  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useBarcodeQuery(barcode);

  const handleScan = (err, result) => {
    if (result) {
      const scannedBarcode = result.text;
      setBarcode(scannedBarcode);
      setIsScanning(false);
    } else if (err && err.name !== 'NotFoundException') {
      console.error('Scan Error:', err);
    }
  };

  const showScanner = () => {
    setIsScanning(true);
    setBarcode('');
  };
  if (isError) {
    return <>{error?.message}</>;
  }

  const navigate = useNavigate();
  const gotoBackPage = () => navigate(-1);

  return (
    <div className="ingredients-search-wrap">
      <div className="title-top">
        <Button
          startIcon={<ArrowBackIosIcon />}
          className="button-back"
          onClick={gotoBackPage}
        />
        Barcode Search
        <Button
          onClick={() => navigate('/ingredients/search')}
          className="button-barcode"
          title="바코드 검색"
        >
          <SearchIcon sx={{ color: '#56868d' }} />
        </Button>
      </div>
      <div className="search">
        <Box
          sx={{
            p: 2,
            backgroundColor: '#fffaef',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: 'clamp(0.8rem, 5vw, 1.8rem)',
              }}
            >
              바코드 검색
            </Typography>
            <p style={{ marginBottom: '1rem' }}>
              {!productData && '바코드를 스캔해주세요.'}
            </p>
          </div>
          {!productData && (
            <BarcodeScanner
              width="100%"
              height="100%"
              onUpdate={(err, result) => {
                handleScan(err, result);
              }}
            />
          )}

          {!isScanning && (
            <Button variant="contained" onClick={showScanner}>
              바코드 다시 읽기
            </Button>
          )}
          {isLoading && <p>로딩 중...</p>}
          {error?.message && (
            <p style={{ color: 'red' }}>
              상품 정보를 가져오는 중 오류가 발생했습니다.
            </p>
          )}
          {productData && <IngredientsBarcodeResult product={productData} />}
        </Box>
      </div>
    </div>
  );
};
// 8807920893789;
export default IngredientsBarcodeSearch;
