// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import AddModifyPage from './pages/AddModifyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-modify" element={<AddModifyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
