import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRecipeDetail from '../../hooks/useRecipeDetail';

const RecipeDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useRecipeDetail({ id, keyword: 'test', page: 1, filter: null });
    const [recipe, setRecipe] = useState(null);
    const [code, setCode] = useState(null);
    console.log('RecipeDetail');

    console.log(id, data, code, recipe);

    useEffect(() => {
        console.log('updated', code, recipe);
        setRecipe(data?.data?.COOKRCP01?.row[0]);
        setCode(data?.data?.COOKRCP01?.RESULT?.CODE);
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
        <div>
            <div>
                RecipeDetail {id}
            </div>
            <div>
                {recipe.RCP_NM}
            </div>
        </div>
    )
}

export default RecipeDetail