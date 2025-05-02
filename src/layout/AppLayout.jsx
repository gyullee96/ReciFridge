import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <Link to="/">Home</Link>&nbsp;
      <Link to="/ingredients/barcode">Ingredients/barcode</Link>&nbsp;
      <Link to="/ingredients/search">Ingredients/search</Link>&nbsp;
      <Link to="/recipe">Recipe</Link>&nbsp;
      <Link to="/status">Status</Link>&nbsp;
      <Outlet />
    </div>
  );
};

export default AppLayout;
