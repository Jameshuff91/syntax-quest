import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const GameStats: React.FC = () => {
  const { gameStats } = useContext(GameContext);

  const xpPercentage = (gameStats.xp / gameStats.xpToNextLevel) * 100;

  return (
    <div style={styles.container}>
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