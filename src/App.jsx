// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import HomeCarreiraLab from './pages/HomeCarreiraLab';
import Analysis from './pages/Analysis';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomeCarreiraLab />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;