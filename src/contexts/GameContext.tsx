// src/contexts/GameContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Challenge } from '../data/challenges';

interface GameContextType {
  completedChallenges: string[];
  addCompletedChallenge: (challengeId: string) => void;
  attempts: { [key: string]: number };
  incrementAttempt: (challengeId: string) => void;
}

export const GameContext = createContext<GameContextType>({
  completedChallenges: [],
  addCompletedChallenge: () => {},
  attempts: {},
  incrementAttempt: () => {},
});

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<{ [key: string]: number }>({});

  const addCompletedChallenge = (challengeId: string) => {
    setCompletedChallenges((prev) => [...prev, challengeId]);
  };

  const incrementAttempt = (challengeId: string) => {
    setAttempts((prev) => ({
      ...prev,
      [challengeId]: prev[challengeId] ? prev[challengeId] + 1 : 1,
    }));
  };

  return (
    <GameContext.Provider
      value={{ completedChallenges, addCompletedChallenge, attempts, incrementAttempt }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
