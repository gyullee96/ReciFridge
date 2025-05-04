import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeDetail.style.css';

const RecipeDetail = () => {
    const { menu: recipe } = useLocation().state;

    const [manual, setManual] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    const FILED_COUNT = 20;

    useEffect(() => {
        if (recipe) {
            let manual = [];
            for (let i = 1; i <= FILED_COUNT; ++i) {
                const numString = i < 10 ? `0${i}` : `${i}`;
                const manualName = `MANUAL${numString}`;
                const manualImgName = `MANUAL_IMG${numString}`;

                if (recipe[manualName] === '') break;

                manual.push([recipe[manualImgName], recipe[manualName]]);
            }
            setManual(manual);

            let ingredient = recipe.RCP_PARTS_DTLS.split('●');
            setIngredient(ingredient);
        }
    }, []);

    if (!manual) {
        return <CircularProgress />;
    }

    return (
        <div className="recipe-main">
            <hr style={{ width: '100%', border: '0.3rem solid #A1C8C4' }}></hr>
            <div style={{ border: 'none', borderTop: '1.0rem solid' }} />
            <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2.0rem' }}>
                {recipe.RCP_NM}
            </h1>
            <div style={{ marginTop: 10 }}>
                <img src={recipe.ATT_FILE_NO_MAIN} className="image-box" />
            </div>
            <div style={{ border: 'none', borderTop: '1.0rem solid' }} />
            {recipe?.RCP_NA_TIP && (
                <p
                    style={{
                        width: '80%',
                        textAlign: 'center',
                        fontSize: '0.6rem',
                        fontStyle: 'italic',
                    }}
                >
                    Tip : {recipe.RCP_NA_TIP}
                </p>
            )}
            <div style={{ border: 'none', borderTop: '0.5rem solid' }} />
            {/*<hr style={{ width: '100%', border: '3px solid #F68528', opacity: 0.5 }}></hr>*/}
            <div style={{ border: 'none', borderTop: '0.5rem solid' }} />
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
                <h4>
                    {ingredient.map((part, index) => {
                        return (
                            <div key={index} style={{}}>
                                {part}
                            </div>
                        );
                    })}
                </h4>
            </div>
            <div style={{ border: 'none', borderTop: '0.5rem solid' }} />
            {/*<hr style={{ width: '100%', border: '3px solid #F68528', opacity: 0.5 }}></hr>*/}
            <div className="description-container">
                {manual.map((content, index) => {
                    return (
                        <div key={index} className="description-component">
                            <img src={content[0]} className="image-box" />
                            <div style={{ marginLeft: '15px' }}>{content[1]}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecipeDetail;
