// src/contexts/GameContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { soundManager } from '../utils/soundManager';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GameStats {
  totalPoints: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  bestStreak: number;
  totalChallengesCompleted: number;
  perfectSolves: number;
}

interface GameContextType {
  completedChallenges: string[];
  addCompletedChallenge: (challengeId: string, attempts: number, difficulty: string) => void;
  attempts: { [key: string]: number };
  incrementAttempt: (challengeId: string) => void;
  gameStats: GameStats;
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  resetStreak: () => void;
}

const defaultAchievements: Achievement[] = [
  { id: 'first-blood', name: 'First Blood', description: 'Complete your first challenge', icon: '🎯', unlocked: false },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Solve a challenge on first try', icon: '⚡', unlocked: false },
  { id: 'streak-master', name: 'Streak Master', description: 'Achieve a 5 challenge streak', icon: '🔥', unlocked: false },
  { id: 'realm-conqueror', name: 'Realm Conqueror', description: 'Complete all challenges in a realm', icon: '👑', unlocked: false },
  { id: 'persistent', name: 'Persistent', description: 'Solve a challenge after 5+ attempts', icon: '💪', unlocked: false },
  { id: 'level-10', name: 'Double Digits', description: 'Reach level 10', icon: '🌟', unlocked: false },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Solve 10 challenges on first try', icon: '💯', unlocked: false },
  { id: 'polyglot', name: 'Polyglot', description: 'Complete challenges in 3 different realms', icon: '🌍', unlocked: false },
];

const defaultGameStats: GameStats = {
  totalPoints: 0,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  bestStreak: 0,
  totalChallengesCompleted: 0,
  perfectSolves: 0,
};

export const GameContext = createContext<GameContextType>({
  completedChallenges: [],
  addCompletedChallenge: () => {},
  attempts: {},
  incrementAttempt: () => {},
  gameStats: defaultGameStats,
  achievements: defaultAchievements,
  unlockAchievement: () => {},
  resetStreak: () => {},
});

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<{ [key: string]: number }>({});
  const [gameStats, setGameStats] = useState<GameStats>(defaultGameStats);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);

  const calculatePoints = (difficulty: string, attempts: number): number => {
    const basePoints = { easy: 100, medium: 200, hard: 300 }[difficulty] || 100;
    const attemptMultiplier = Math.max(0.5, 1 - (attempts - 1) * 0.1);
    return Math.round(basePoints * attemptMultiplier);
  };

  const calculateXPNeeded = (level: number): number => {
    return 100 + (level - 1) * 50;
  };

  const checkAchievements = (stats: GameStats, challengeAttempts: number, completedRealms: Set<string>) => {
    const achievementsToUnlock: string[] = [];

    if (stats.totalChallengesCompleted === 1) {
      achievementsToUnlock.push('first-blood');
    }
    if (challengeAttempts === 1 && stats.perfectSolves === 1) {
      achievementsToUnlock.push('speed-demon');
    }
    if (stats.streak >= 5) {
      achievementsToUnlock.push('streak-master');
    }
    if (challengeAttempts >= 5) {
      achievementsToUnlock.push('persistent');
    }
    if (stats.level >= 10) {
      achievementsToUnlock.push('level-10');
    }
    if (stats.perfectSolves >= 10) {
      achievementsToUnlock.push('perfectionist');
    }
    if (completedRealms.size >= 3) {
      achievementsToUnlock.push('polyglot');
    }

    return achievementsToUnlock;
  };

  const addCompletedChallenge = (challengeId: string, challengeAttempts: number, difficulty: string) => {
    if (completedChallenges.includes(challengeId)) return;

    setCompletedChallenges((prev) => [...prev, challengeId]);
    
    const points = calculatePoints(difficulty, challengeAttempts);
    
    setGameStats((prevStats) => {
      const newXP = prevStats.xp + points;
      let newLevel = prevStats.level;
      let remainingXP = newXP;
      
      let leveledUp = false;
      while (remainingXP >= calculateXPNeeded(newLevel)) {
        remainingXP -= calculateXPNeeded(newLevel);
        newLevel++;
        leveledUp = true;
      }
      
      if (leveledUp) {
        soundManager.playLevelUp();
      }
      
      const newStreak = challengeAttempts === 1 ? prevStats.streak + 1 : 0;
      const newBestStreak = Math.max(prevStats.bestStreak, newStreak);
      const newPerfectSolves = challengeAttempts === 1 ? prevStats.perfectSolves + 1 : prevStats.perfectSolves;
      
      const newStats = {
        totalPoints: prevStats.totalPoints + points,
        level: newLevel,
        xp: remainingXP,
        xpToNextLevel: calculateXPNeeded(newLevel),
        streak: newStreak,
        bestStreak: newBestStreak,
        totalChallengesCompleted: prevStats.totalChallengesCompleted + 1,
        perfectSolves: newPerfectSolves,
      };
      
      const completedRealms = new Set<string>();
      const achievementsToUnlock = checkAchievements(newStats, challengeAttempts, completedRealms);
      
      achievementsToUnlock.forEach(achievementId => {
        unlockAchievement(achievementId);
      });
      
      return newStats;
    });
  };

  const incrementAttempt = (challengeId: string) => {
    setAttempts((prev) => ({
      ...prev,
      [challengeId]: prev[challengeId] ? prev[challengeId] + 1 : 1,
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) => {
      const wasUnlocked = prev.find(a => a.id === achievementId)?.unlocked;
      const updated = prev.map(achievement => 
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      );
      
      // Play sound only if achievement was newly unlocked
      if (!wasUnlocked && updated.find(a => a.id === achievementId)?.unlocked) {
        soundManager.playAchievement();
      }
      
      return updated;
    });
  };

  const resetStreak = () => {
    setGameStats((prev) => ({ ...prev, streak: 0 }));
  };

  return (
    <GameContext.Provider
      value={{ 
        completedChallenges, 
        addCompletedChallenge, 
        attempts, 
        incrementAttempt,
        gameStats,
        achievements,
        unlockAchievement,
        resetStreak,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
