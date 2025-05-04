import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import CoverPage from './pages/CoverPage/CoverPage';
import Home from './pages/HomePage/Home';
import IngredientsBarcodeSearch from './pages/ingredientsSearch/IngredientsBarcodeSearch';
import IngredientsSearch from './pages/IngredientsSearch/IngredientsSearch';
import IngredientsStatus from './pages/IngredientsStatus/IngredientsStatus';
import RecipeDetail from './pages/RecipeDetailPage/RecipeDetail';
import RecipeSearchPage from './pages/RecipeSearchPage/RecipeSearchPage';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="" element={<CoverPage />} />
        <Route path="home" element={<Home />} />
        <Route path="ingredients">
          <Route path="barcode" element={<IngredientsBarcodeSearch />} />
          <Route path="search" element={<IngredientsSearch />} />
        </Route>
        <Route path="recipe" element={<AppLayout />}>
          <Route index element={<RecipeSearchPage />} />
          <Route path="detail" element={<RecipeDetail />} />
        </Route>
        <Route path="status" element={<IngredientsStatus />} />
      </Route>
    </Routes>
  );
}

export default App;
