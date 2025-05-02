import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRecipeDetail from '../../hooks/useRecipeDetail';
import './RecipeDetail.style.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useRecipeDetail({ id, keyword: 'test', page: 1, filter: null });
    const [recipe, setRecipe] = useState(null);
    const [code, setCode] = useState(null);
    const [manual, setManual] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    console.log('RecipeDetail');

    console.log(id, data, code, recipe);

    const FILED_COUNT = 20;

    useEffect(() => {
        let recipe = data?.data?.COOKRCP01?.row[0];
        if (recipe) {
            setRecipe(recipe);
            setCode(data.data.COOKRCP01.RESULT.CODE);

            let manual = [];
            for (let i = 1; i <= FILED_COUNT; ++i) {
                const numString = i < 10 ? `0${i}` : `${i}`;
                const manualName = `MANUAL${numString}`;
                const manualImgName = `MANUAL_IMG${numString}`;

                if (recipe[manualName] === '')
                    break;

                manual.push([recipe[manualImgName], recipe[manualName]]);
            }
            setManual(manual);

            let ingredient = recipe.RCP_PARTS_DTLS.split('●');
            setIngredient(ingredient);
        }
    }, [data]);

    if (isLoading || !recipe) {
        return <CircularProgress />;
    }

    if (code != 'INFO-000') {
        return <div> Something went wrong {code}</div>
    }

    if (isError) {
        return <div> Critical issue occurred!!!</div>
    }

    return (
        <div className='recipe-main'>
            <div style={{ marginTop: 10 }}>
                <img src={recipe.ATT_FILE_NO_MAIN} className='image-box' />
            </div>
            <h1 style={{ fontWeight: 800 }}>
                {recipe.RCP_NM}
            </h1>
            <p style={{ width: '80%' }}>
                {recipe.RCP_NA_TIP}
            </p>
            <hr style={{ width: '100%', border: '3px solid #A1C8C4' }}></hr>
            <h3 style={{ width: '80%' }}>
                {ingredient.map((part, index) => {
                    return (<div key={index} style={{ margin: '10px' }}>{part}</div>)
                })}
            </h3>
            <hr style={{ width: '100%', border: '3px solid #A1C8C4' }}></hr>
            <div className='description-container'>
                {manual.map((content, index) => {
                    return (<div key={index}>
                        <img src={content[0]} className='image-box' />
                        <div>{content[1]}</div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default RecipeDetail