import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

const ingredientsBarcodeResult = ({ product }) => {
    const [infos, setInfos] = useState([]);
    const { data: productData, isLoading, error: queryError } = useBarcodeQuery(8801062865284);

    const FILED_COUNT = 10;

    useEffect(() => {
        if (!product)
            return;

        let infos = [];
        for (let i = 0; i <= FILED_COUNT; ++i) {
            const infoName = `pvInfo${i}`;
            if (!product.productDetails.includes(infoName))
                break;

            infos.push([product.productDetails['label'], product.productDetails['value']]);
        }
        setInfos(infos);
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    product = productData.data;
    console.log('product', product);

    return (
        <div className='recipe-main'>
            <hr style={{ width: '100%', border: '0.3rem solid #A1C8C4' }}></hr>
            <div style={{ border: 'none', borderTop: '1.0rem solid' }} />

            <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2.0rem' }}>
                {product.productName}
            </h1>
            <div style={{ marginTop: 10 }}>
                <img src={product.productImage} className='image-box' />
            </div>
            <div style={{ border: 'none', borderTop: '1.0rem solid' }} />

            {product?.productPrice &&
                <p style={{ width: '80%', textAlign: 'center', fontSize: '0.6rem', fontStyle: 'italic' }}>
                    Price : {product.productPrice}
                </p>
            }
            <div style={{ border: 'none', borderTop: '0.5rem solid' }} />

            <div style={{ width: '80%', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: '5px solid #F68528', padding: '15px', borderColor: 'rgba(246, 133, 40, 0.5)' }}>
                <h4>
                    {infos.map((info, index) => {
                        return (<div key={index} style={{}}>{part}</div>)
                    })}
                </h4>
            </div>
            <div style={{ border: 'none', borderTop: '0.5rem solid' }} />

            <div className='description-container'>
                {infos.map((info, index) => {
                    return (<div key={index} className='description-component'>
                        <div style={{ marginLeft: '15px' }}>{info[0]} : {info[1]}</div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default ingredientsBarcodeResult