import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RealmPage from './pages/RealmPage';
import NextjsRealmPage from './pages/NextjsRealmPage';
import TestingRealmPage from './pages/TestingRealmPage';
import DebuggingRealmPage from './pages/DebuggingRealmPage';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';
import ProgressDashboard from './components/ProgressDashboard';

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
          <Route path="/realm/testing" element={<TestingRealmPage />} />
          <Route path="/realm/debugging" element={<DebuggingRealmPage />} />
          <Route path="/progress" element={<ProgressDashboard />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
};

export default App;