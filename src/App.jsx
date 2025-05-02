import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Home from './pages/HomePage/Home';
import RecipeDetail from './pages/RecipeDetailPage/RecipeDetail';
import RecipeSearchPage from './pages/RecipeSearchPage/RecipeSearchPage';
import IngredientsStatus from './pages/ingredientsStatus/IngredientsStatus';

import IngredientsSearch from './pages/ingredientsSearch/IngredientsSearch';
import IngredientsBarcodeSearch from './pages/ingredientsSearch/ingredientsBarcodeSearch';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="ingredients">
          <Route path="barcode" element={<IngredientsBarcodeSearch />} />
          <Route path="search" element={<IngredientsSearch />} />
        </Route>
        <Route path="recipe" element={<AppLayout />}>
          <Route index element={<RecipeSearchPage />} />{' '}
          {/* todo : recipe page */}
          <Route path=":id" element={<RecipeDetail />} />
        </Route>
        <Route path="status" element={<IngredientsStatus />} />
      </Route>
    </Routes>
  );
}

export default App;
