import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Home from './pages/HomePage/Home';
import RecipeDetail from './pages/RecipeDetailPage/RecipeDetail';

function App() {
  return (
    <Routes>
      <Route path="/"> {/* todo : cover page */}
        <Route path="home" element={<Home />} />
        <Route path="recipe" element={<AppLayout />}>
          <Route index element={<RecipeDetail />} /> {/* todo : recipe page */}
          <Route path=":id" element={<RecipeDetail />} />
        </Route>
      </Route>
    </Routes >
  );
}

export default App;
