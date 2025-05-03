/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './IngredientsBarcodeResult.style.css';

const IngredientsBarcodeResult = (props) => {
  const [infos, setInfos] = useState([]);
  const { product } = props;
  //   const {
  //     data: product,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useBarcodeQuery(8801062865284);

  const FILED_COUNT = 10;
  const INFO_FILTER = [1, 3, 4, 5, 6, 7];
  console.log(product);

  useEffect(() => {
    if (!product) return;

    let infos = [];
    for (let i = 0; i <= FILED_COUNT; ++i) {
      const infoName = `pvInfo${i}`;
      if (infoName in product.productDetails === false) break;

      if (!INFO_FILTER.includes(i)) continue;

      infos.push([
        product.productDetails[infoName].label,
        product.productDetails[infoName].value,
      ]);
    }
    setInfos(infos);
  }, [product]);

  return (
    <div className="result-main">
      <hr style={{ width: '100%', border: '0.3rem solid #A1C8C4' }}></hr>
      <div style={{ border: 'none', borderTop: '1.0rem solid' }} />

      <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2.0rem' }}>
        {product.productName}
      </h1>
      <div style={{ marginTop: 10 }}>
        <img src={product.productImage} className="image-box" />
      </div>
      <div style={{ border: 'none', borderTop: '1.0rem solid' }} />

      {Number.isFinite('abc') && (
        <div
          style={{
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            border: '5px solid #F68528',
            padding: '15px',
            borderColor: 'rgba(246, 133, 40, 0.5)',
          }}
        >
          <h4>Price : {product.productPrice}</h4>
        </div>
      )}
      <hr style={{ width: '100%', border: '0.3rem solid #A1C8C4' }}></hr>
      <div style={{ border: 'none', borderTop: '0.5rem solid' }} />

      <div className="description-container">
        {infos.map((info, index) => {
          return (
            <div key={index} className="description-component">
              <div style={{ marginLeft: '15px' }}>
                {info[0]} : {info[1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientsBarcodeResult;
