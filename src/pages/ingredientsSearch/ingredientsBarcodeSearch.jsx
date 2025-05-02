/* eslint-disable prettier/prettier */
import { React, useState} from 'react'
import BarcodeScanner from 'react-qr-barcode-scanner'

const ingredientsBarcodeSearch = () => {

  const [barcode, setBarcode] = useState('');

  const handleScan = (err,result) => {
    if (result) setBarcode(result.text);
    else setBarcode("");
  }

  return (
    <>
      <p>{barcode}</p>
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result) => {
          handleScan(err,result);
        }}
      />
    </>
  )
}

export default ingredientsBarcodeSearch