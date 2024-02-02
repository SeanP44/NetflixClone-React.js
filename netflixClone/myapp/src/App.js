import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './screens/homePage';
import ManageProfile from './screens/manageProfile';
import React from 'react';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/browse" element={<HomePage />} />
        <Route path="/profiles" element={<ManageProfile />} />
        <Route path="/" element={<Navigate replace to="/profiles" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;