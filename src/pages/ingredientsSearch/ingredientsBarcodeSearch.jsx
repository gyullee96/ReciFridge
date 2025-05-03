import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { React, useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';
import { useNavigate } from 'react-router-dom';
import useBarcodeQuery from '../../hooks/useBarcodeQuery';
import './ingredientsBarcodeSearch.style.css';
const ingredientsBarcodeSearch = () => {
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
        Keyword Search
        <Button
          onClick={() => navigate('/ingredients/search')}
          className="button-barcode"
          title="바코드 검색"
        >
          <SearchIcon />
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
              sx={{
                fontSize: 'clamp(0.8rem, 5vw, 1.8rem)',
              }}
            >
              바코드 검색
            </Typography>
            <p>{!barcode && '바코드를 스캔해주세요.'}</p>
          </div>
          {!barcode && isScanning && (
            <BarcodeScanner
              width={500}
              height={500}
              onUpdate={(err, result) => {
                handleScan(err, result);
              }}
            />
          )}

          {!barcode && !isScanning && (
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
          {productData && (
            <div>
              {productData?.productImage && (
                <img src={productData?.productImage} />
              )}
              <Typography
                sx={{
                  fontSize: 'clamp(0.8rem, 5vw, 1.8rem)',
                }}
              >
                {productData?.productName}
              </Typography>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
};
// 8807920893789;
export default ingredientsBarcodeSearch;
