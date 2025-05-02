import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Home from './pages/HomePage/Home';
import RecipeDetail from './pages/RecipeDetailPage/RecipeDetail';
import RecipeSearchPage from './pages/RecipeSearchPage/RecipeSearchPage';
import IngredientsStatus from './pages/ingredientsStatus/ingredientsStatus';
function App() {
  return (
    <Routes>
      <Route path="/">
        {' '}
        {/* todo : cover page */}
        <Route path="home" element={<Home />} />
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
