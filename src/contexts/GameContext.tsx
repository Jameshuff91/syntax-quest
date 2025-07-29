// src/contexts/GameContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { soundManager } from '../utils/soundManager';
import { getLevelUpMessage } from '../utils/motivationalMessages';

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

interface PowerUps {
  hintTokens: number;
  skipTokens: number;
  doubleXPActive: boolean;
  doubleXPExpiry?: Date;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  level: number;
  challenges: number;
  date: Date;
  realm?: string;
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
  leaderboard: LeaderboardEntry[];
  addLeaderboardEntry: (name: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  powerUps: PowerUps;
  useHintToken: () => boolean;
  useSkipToken: () => boolean;
  addPowerUp: (type: 'hint' | 'skip' | 'doubleXP', quantity?: number) => void;
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

const defaultPowerUps: PowerUps = {
  hintTokens: 3, // Start with 3 free hints
  skipTokens: 1, // Start with 1 skip
  doubleXPActive: false,
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
  leaderboard: [],
  addLeaderboardEntry: () => {},
  playerName: '',
  setPlayerName: () => {},
  powerUps: defaultPowerUps,
  useHintToken: () => false,
  useSkipToken: () => false,
  addPowerUp: () => {},
});

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<{ [key: string]: number }>({});
  const [gameStats, setGameStats] = useState<GameStats>(defaultGameStats);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [powerUps, setPowerUps] = useState<PowerUps>(defaultPowerUps);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('syntaxQuestLeaderboard');
    const savedPlayerName = localStorage.getItem('syntaxQuestPlayerName');
    const savedPowerUps = localStorage.getItem('syntaxQuestPowerUps');
    
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
    }
    if (savedPowerUps) {
      setPowerUps(JSON.parse(savedPowerUps));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (leaderboard.length > 0) {
      localStorage.setItem('syntaxQuestLeaderboard', JSON.stringify(leaderboard));
    }
  }, [leaderboard]);
  
  useEffect(() => {
    localStorage.setItem('syntaxQuestPowerUps', JSON.stringify(powerUps));
  }, [powerUps]);

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
    
    let points = calculatePoints(difficulty, challengeAttempts);
    
    // Add bonus XP for daily challenges
    if (challengeId.startsWith('daily-')) {
      const bonusXP = { easy: 150, medium: 400, hard: 750 }[difficulty] || 150;
      points += bonusXP;
    }
    
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
        
        // Award power-ups on level up
        if (newLevel % 2 === 0) {
          // Every even level gives a hint token
          setPowerUps(prev => ({ ...prev, hintTokens: prev.hintTokens + 1 }));
        }
        if (newLevel % 5 === 0) {
          // Every 5 levels gives a skip token
          setPowerUps(prev => ({ ...prev, skipTokens: prev.skipTokens + 1 }));
        }
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

  const addLeaderboardEntry = (name: string) => {
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name,
      score: gameStats.totalPoints,
      level: gameStats.level,
      challenges: gameStats.totalChallengesCompleted,
      date: new Date(),
    };

    setLeaderboard((prev) => {
      const updated = [...prev, newEntry];
      // Sort by score descending and keep top 100
      return updated.sort((a, b) => b.score - a.score).slice(0, 100);
    });

    // Save player name
    setPlayerName(name);
    localStorage.setItem('syntaxQuestPlayerName', name);
  };

  const useHintToken = (): boolean => {
    if (powerUps.hintTokens > 0) {
      setPowerUps(prev => ({ ...prev, hintTokens: prev.hintTokens - 1 }));
      soundManager.playClick();
      return true;
    }
    return false;
  };

  const useSkipToken = (): boolean => {
    if (powerUps.skipTokens > 0) {
      setPowerUps(prev => ({ ...prev, skipTokens: prev.skipTokens - 1 }));
      soundManager.playSuccess();
      return true;
    }
    return false;
  };

  const addPowerUp = (type: 'hint' | 'skip' | 'doubleXP', quantity: number = 1) => {
    setPowerUps(prev => {
      switch (type) {
        case 'hint':
          return { ...prev, hintTokens: prev.hintTokens + quantity };
        case 'skip':
          return { ...prev, skipTokens: prev.skipTokens + quantity };
        case 'doubleXP':
          const expiry = new Date();
          expiry.setHours(expiry.getHours() + 1); // 1 hour double XP
          return { ...prev, doubleXPActive: true, doubleXPExpiry: expiry };
        default:
          return prev;
      }
    });
    soundManager.playAchievement();
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
        leaderboard,
        addLeaderboardEntry,
        playerName,
        setPlayerName,
        powerUps,
        useHintToken,
        useSkipToken,
        addPowerUp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
