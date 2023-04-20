import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardPage from './pages/CardPage';
import LandingPage from './pages/LandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SearchRecipes from './pages/SearchRecipesPage';
import ViewRecipes from './pages/ViewRecipesPage';
import ViewProfile from './pages/ViewProfilePage';
import CreateRecipes from './pages/CreateRecipesPage';
import EditRecipes from './pages/EditRecipesPage';
import FavoriteRecipes from './pages/FavoritesPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/landing" index element={<LandingPage />} />
        <Route path="/forgotPassword" index element={<ForgotPasswordPage />} />
        <Route path="/cards" index element={<CardPage />} />
        <Route path="/search" index element={<SearchRecipes />} />
        <Route path="/create" index element={<CreateRecipes />} />
        <Route path="/profile" index element={<ViewProfile />} />
        <Route path="/view" index element={<ViewRecipes />} />
        <Route path="/edit" index element={<EditRecipes />} />
        <Route path="/favorites" index element={<FavoriteRecipes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
