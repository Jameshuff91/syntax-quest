import { Challenge } from '../data/challenges';
import { challenges } from '../data/challenges';
import { typescriptChallenges } from '../data/typescriptChallenges';
import { reactChallenges } from '../data/reactChallenges';
import { pythonChallenges } from '../data/pythonChallenges';
import { helmChallenges } from '../data/helmChallenges';
import { terraformChallenges } from '../data/terraformChallenges';
import { cloudCliChallenges } from '../data/cloudCliChallenges';

// Combine all challenges
const allChallenges = [
  ...challenges,
  ...typescriptChallenges,
  ...reactChallenges,
  ...pythonChallenges,
  ...helmChallenges,
  ...terraformChallenges,
  ...cloudCliChallenges,
];

export interface DailyChallenge extends Challenge {
  bonusXP: number;
  expiresAt: Date;
}

// Use a deterministic random based on date to ensure same challenge for all users
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getDailyChallenge(): DailyChallenge | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Use date as seed for consistent daily challenge
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const randomIndex = Math.floor(seededRandom(seed) * allChallenges.length);
  
  const baseChallenge = allChallenges[randomIndex];
  
  // Calculate bonus XP based on difficulty
  const bonusMultiplier = {
    easy: 1.5,
    medium: 2,
    hard: 2.5
  };
  
  const baseXP = {
    easy: 100,
    medium: 200,
    hard: 300
  };
  
  const bonusXP = Math.round(baseXP[baseChallenge.difficulty] * bonusMultiplier[baseChallenge.difficulty]);
  
  return {
    ...baseChallenge,
    id: `daily-${baseChallenge.id}`,
    title: `⭐ Daily: ${baseChallenge.title}`,
    bonusXP,
    expiresAt: tomorrow,
  };
}

export function isDailyChallengeCompleted(completedChallenges: string[]): boolean {
  const dailyChallenge = getDailyChallenge();
  if (!dailyChallenge) return false;
  
  return completedChallenges.includes(dailyChallenge.id);
}

export function getDailyChallengeTimeRemaining(): string {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}