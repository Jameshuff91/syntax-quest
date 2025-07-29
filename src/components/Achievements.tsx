import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';

const Achievements: React.FC = () => {
  const { achievements } = useContext(GameContext);
  const [showAll, setShowAll] = useState(false);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const displayAchievements = showAll ? achievements : achievements.filter(a => a.unlocked);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Achievements</h3>
        <span style={styles.counter}>{unlockedCount} / {achievements.length}</span>
      </div>
      
      <div style={styles.achievementsGrid}>
        {displayAchievements.map((achievement) => (
          <div 
            key={achievement.id}
            style={{
              ...styles.achievementCard,
              ...(achievement.unlocked ? styles.unlocked : styles.locked),
            }}
          >
            <div style={styles.achievementIcon}>
              {achievement.unlocked ? achievement.icon : '🔒'}
            </div>
            <div style={styles.achievementInfo}>
              <h4 style={styles.achievementName}>{achievement.name}</h4>
              <p style={styles.achievementDescription}>{achievement.description}</p>
              {achievement.unlockedAt && (
                <span style={styles.unlockedDate}>
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => setShowAll(!showAll)}
        style={styles.toggleButton}
      >
        {showAll ? 'Show Unlocked Only' : 'Show All Achievements'}
      </button>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: {
    margin: 0,
    color: '#333',
    fontSize: '20px',
  },
  counter: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  achievementsGrid: {
    display: 'grid',
    gap: '10px',
    marginBottom: '15px',
  },
  achievementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  unlocked: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  locked: {
    backgroundColor: '#e0e0e0',
    opacity: 0.7,
  },
  achievementIcon: {
    fontSize: '36px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    margin: '0 0 5px 0',
    fontSize: '16px',
    color: '#333',
  },
  achievementDescription: {
    margin: '0 0 5px 0',
    fontSize: '14px',
    color: '#666',
  },
  unlockedDate: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic' as const,
  },
  toggleButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1976D2',
    },
  },
};

export default Achievements;