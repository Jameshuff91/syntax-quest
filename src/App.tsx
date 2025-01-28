import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RealmPage from './pages/RealmPage';
import NextjsRealmPage from './pages/NextjsRealmPage';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GameProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/realm/:realmId" element={<RealmPage />} />
          <Route path="/realm/typescript" element={<RealmPage realmId="typescript" />} />
          <Route path="/realm/nextjs" element={<NextjsRealmPage />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
};

export default App;