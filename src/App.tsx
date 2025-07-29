import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RealmPage from './pages/RealmPage';
import NextjsRealmPage from './pages/NextjsRealmPage';
import TestingRealmPage from './pages/TestingRealmPage';
import DebuggingRealmPage from './pages/DebuggingRealmPage';
import HelmRealmPage from './pages/HelmRealmPage';
import TerraformRealmPage from './pages/TerraformRealmPage';
import CloudCliRealmPage from './pages/CloudCliRealmPage';
import PythonRealmPage from './pages/PythonRealmPage';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';
import ProgressDashboard from './components/ProgressDashboard';
import SoundToggle from './components/SoundToggle';

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
          <Route path="/realm/helm" element={<HelmRealmPage />} />
          <Route path="/realm/terraform" element={<TerraformRealmPage />} />
          <Route path="/realm/cloudcli" element={<CloudCliRealmPage />} />
          <Route path="/realm/python" element={<PythonRealmPage />} />
          <Route path="/progress" element={<ProgressDashboard />} />
        </Routes>
        <SoundToggle />
      </GameProvider>
    </BrowserRouter>
  );
};

export default App;