import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import CardPage from './pages/CardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/forgotPassword" index element={<ForgotPasswordPage />} />
        <Route path="/cards" index element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;