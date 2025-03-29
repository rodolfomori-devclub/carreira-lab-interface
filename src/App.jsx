// src/App.jsx (atualizado)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import HomeCarreiraLab from './pages/HomeCarreiraLab';
import Analysis from './pages/Analysis';
import Chat from './pages/Chat';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomeCarreiraLab />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;