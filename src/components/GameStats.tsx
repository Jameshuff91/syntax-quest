import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const GameStats: React.FC = () => {
  const { gameStats, leaderboard, playerName, playerAvatar } = useContext(GameContext);
  
  const avatars: { [key: string]: { emoji: string; name: string } } = {
    'ninja': { emoji: '🥷', name: 'Code Ninja' },
    'wizard': { emoji: '🧙‍♂️', name: 'Code Wizard' },
    'robot': { emoji: '🤖', name: 'Code Bot' },
    'alien': { emoji: '👽', name: 'Code Alien' },
    'astronaut': { emoji: '👨‍🚀', name: 'Code Explorer' },
    'detective': { emoji: '🕵️', name: 'Bug Detective' },
    'superhero': { emoji: '🦸', name: 'Code Hero' },
    'pirate': { emoji: '🏴‍☠️', name: 'Code Pirate' },
    'unicorn': { emoji: '🦄', name: 'Code Unicorn' },
    'dragon': { emoji: '🐉', name: 'Code Dragon' },
  };

  const xpPercentage = (gameStats.xp / gameStats.xpToNextLevel) * 100;
  
  const currentRank = leaderboard.findIndex(entry => 
    entry.score === gameStats.totalPoints && entry.name === playerName
  ) + 1;

  const currentAvatar = avatars[playerAvatar] || avatars['ninja'];

  return (
    <div style={styles.container}>
      <div style={styles.playerInfo}>
        <div style={styles.avatarBadge}>
          <span style={styles.avatarEmoji}>{currentAvatar.emoji}</span>
        </div>
        <div style={styles.playerDetails}>
          <h3 style={styles.playerName}>{playerName || 'Anonymous Player'}</h3>
          <p style={styles.avatarTitle}>{currentAvatar.name}</p>
        </div>
      </div>
      
      <div style={styles.levelContainer}>
        <div style={styles.levelBadge}>
          <span style={styles.levelText}>Level</span>
          <span style={styles.levelNumber}>{gameStats.level}</span>
        </div>
        <div style={styles.xpContainer}>
          <div style={styles.xpBar}>
            <div 
              style={{
                ...styles.xpFill,
                width: `${xpPercentage}%`
              }}
            />
          </div>
          <span style={styles.xpText}>
            {gameStats.xp} / {gameStats.xpToNextLevel} XP
          </span>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>🏆</span>
          <span style={styles.statValue}>{gameStats.totalPoints}</span>
          <span style={styles.statLabel}>Total Points</span>
        </div>
        
        <div style={styles.statCard}>
          <span style={styles.statIcon}>🔥</span>
          <span style={styles.statValue}>{gameStats.streak}</span>
          <span style={styles.statLabel}>Current Streak</span>
        </div>
        
        <div style={styles.statCard}>
          <span style={styles.statIcon}>⭐</span>
          <span style={styles.statValue}>{gameStats.totalChallengesCompleted}</span>
          <span style={styles.statLabel}>Completed</span>
        </div>
        
        <div style={styles.statCard}>
          <span style={styles.statIcon}>💯</span>
          <span style={styles.statValue}>{gameStats.perfectSolves}</span>
          <span style={styles.statLabel}>Perfect Solves</span>
        </div>
        
        {currentRank > 0 && (
          <div style={styles.statCard}>
            <span style={styles.statIcon}>🏆</span>
            <span style={styles.statValue}>#{currentRank}</span>
            <span style={styles.statLabel}>Leaderboard Rank</span>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  playerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e0e0e0',
  },
  avatarBadge: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  avatarEmoji: {
    fontSize: '32px',
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    margin: '0 0 5px',
    fontSize: '18px',
    color: '#333',
  },
  avatarTitle: {
    margin: 0,
    fontSize: '14px',
    color: '#666',
  },
  levelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  levelBadge: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(76,175,80,0.3)',
  },
  levelText: {
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
  },
  levelNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  xpContainer: {
    flex: 1,
  },
  xpBar: {
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    height: '20px',
    position: 'relative' as const,
    overflow: 'hidden',
    marginBottom: '5px',
  },
  xpFill: {
    backgroundColor: '#2196F3',
    height: '100%',
    borderRadius: '20px',
    transition: 'width 0.5s ease-in-out',
    background: 'linear-gradient(90deg, #2196F3 0%, #64B5F6 100%)',
  },
  xpText: {
    fontSize: '14px',
    color: '#666',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '15px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  statIcon: {
    fontSize: '24px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center' as const,
  },
};

export default GameStats;