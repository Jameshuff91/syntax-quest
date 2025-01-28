import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RealmPage from './pages/RealmPage';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <GameProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/realm/:realmId" element={<RealmPage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
};

export default App;