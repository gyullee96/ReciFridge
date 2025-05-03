/* eslint-disable prettier/prettier */
import { React, useState } from 'react'
import BarcodeScanner from 'react-qr-barcode-scanner'
import Button from '@mui/material/Button';
import useBarcodeQuery from '../../hooks/useBarcodeQuery';

const ingredientsBarcodeSearch = () => {

  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  const { data: productData, isLoading, error: queryError } = useBarcodeQuery(barcode);

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

  const errorMessage = queryError ? (queryError.message || '상품 정보를 가져오는 중 오류가 발생했습니다.') : null;

  return (
    <>
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
    </>
  )
}

export default ingredientsBarcodeSearch