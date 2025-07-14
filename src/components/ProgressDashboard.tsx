// src/components/ProgressDashboard.tsx

import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { challenges } from '../data/challenges';
import { typescriptChallenges } from '../data/typescriptChallenges';
import { reactChallenges } from '../data/reactChallenges';
import { testingChallenges } from '../data/testingChallenges';
import { debuggingChallenges } from '../data/debuggingChallenges';

interface RealmProgress {
  realm: string;
  total: number;
  completed: number;
  percentage: number;
  icon: string;
  color: string;
}

const ProgressDashboard: React.FC = () => {
  const { completedChallenges, attempts } = useContext(GameContext);
  
  // Combine all challenges
  const allChallenges = [
    ...challenges,
    ...typescriptChallenges,
    ...reactChallenges,
    ...testingChallenges,
    ...debuggingChallenges
  ];
  
  // Calculate progress by realm
  const realmData: RealmProgress[] = [
    {
      realm: 'javascript',
      icon: '🟨',
      color: '#f7df1e'
    },
    {
      realm: 'typescript',
      icon: '🔷',
      color: '#3178c6'
    },
    {
      realm: 'react',
      icon: '⚛️',
      color: '#61dafb'
    },
    {
      realm: 'testing',
      icon: '🧪',
      color: '#9c27b0'
    },
    {
      realm: 'debugging',
      icon: '🐛',
      color: '#ff5722'
    }
  ].map(realm => {
    const realmChallenges = allChallenges.filter(c => c.realm === realm.realm);
    const completed = realmChallenges.filter(c => completedChallenges.includes(c.id)).length;
    
    return {
      ...realm,
      total: realmChallenges.length,
      completed,
      percentage: realmChallenges.length > 0 ? (completed / realmChallenges.length) * 100 : 0
    };
  });
  
  // Calculate overall stats
  const totalChallenges = allChallenges.length;
  const totalCompleted = completedChallenges.length;
  const overallPercentage = totalChallenges > 0 ? (totalCompleted / totalChallenges) * 100 : 0;
  
  // Calculate attempt statistics
  const totalAttempts = Object.values(attempts).reduce((sum, count) => sum + count, 0);
  const averageAttempts = completedChallenges.length > 0 
    ? (totalAttempts / completedChallenges.length).toFixed(1)
    : '0';
  
  // Get recent completions
  const recentCompletions = completedChallenges.slice(-5).reverse().map(id => {
    const challenge = allChallenges.find(c => c.id === id);
    return challenge;
  }).filter(Boolean);
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Your Progress Dashboard</h2>
      
      {/* Overall Progress */}
      <div style={styles.overallSection}>
        <h3>Overall Progress</h3>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${overallPercentage}%`
            }}
          />
        </div>
        <p style={styles.progressText}>
          {totalCompleted} of {totalChallenges} challenges completed ({overallPercentage.toFixed(1)}%)
        </p>
      </div>
      
      {/* Realm Progress */}
      <div style={styles.realmsSection}>
        <h3>Progress by Realm</h3>
        <div style={styles.realmGrid}>
          {realmData.map(realm => (
            <div key={realm.realm} style={styles.realmCard}>
              <div style={styles.realmHeader}>
                <span style={styles.realmIcon}>{realm.icon}</span>
                <span style={styles.realmName}>{realm.realm}</span>
              </div>
              <div style={styles.miniProgressBar}>
                <div 
                  style={{
                    ...styles.miniProgressFill,
                    width: `${realm.percentage}%`,
                    backgroundColor: realm.color
                  }}
                />
              </div>
              <p style={styles.realmStats}>
                {realm.completed}/{realm.total} ({realm.percentage.toFixed(0)}%)
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Statistics */}
      <div style={styles.statsSection}>
        <h3>Statistics</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{totalCompleted}</div>
            <div style={styles.statLabel}>Challenges Completed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{totalAttempts}</div>
            <div style={styles.statLabel}>Total Attempts</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{averageAttempts}</div>
            <div style={styles.statLabel}>Avg Attempts per Challenge</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{(100 - overallPercentage).toFixed(0)}%</div>
            <div style={styles.statLabel}>Room to Grow</div>
          </div>
        </div>
      </div>
      
      {/* Recent Completions */}
      {recentCompletions.length > 0 && (
        <div style={styles.recentSection}>
          <h3>Recent Completions</h3>
          <div style={styles.recentList}>
            {recentCompletions.map((challenge, index) => (
              <div key={index} style={styles.recentItem}>
                <span style={{
                  ...styles.difficultyBadge,
                  backgroundColor: getDifficultyColor(challenge!.difficulty)
                }}>
                  {challenge!.difficulty}
                </span>
                <span>{challenge!.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Motivational Message */}
      <div style={styles.motivationSection}>
        {overallPercentage === 0 && (
          <p>🚀 Ready to start your coding journey? Pick a realm and begin!</p>
        )}
        {overallPercentage > 0 && overallPercentage < 25 && (
          <p>🌱 Great start! Keep going, you're building a strong foundation!</p>
        )}
        {overallPercentage >= 25 && overallPercentage < 50 && (
          <p>💪 You're making excellent progress! Quarter of the way there!</p>
        )}
        {overallPercentage >= 50 && overallPercentage < 75 && (
          <p>🔥 Halfway there! Your skills are really developing!</p>
        )}
        {overallPercentage >= 75 && overallPercentage < 100 && (
          <p>⭐ Amazing work! You're in the home stretch!</p>
        )}
        {overallPercentage === 100 && (
          <p>🏆 Congratulations! You've completed all challenges! You're a Syntax Quest Master!</p>
        )}
      </div>
    </div>
  );
};

// Helper function for difficulty colors
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': return '#4caf50';
    case 'medium': return '#ff9800';
    case 'hard': return '#f44336';
    default: return '#2196f3';
  }
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '30px',
    fontSize: '2em',
    color: '#333',
  },
  overallSection: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  progressBar: {
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.5s ease',
    background: 'linear-gradient(45deg, #4caf50 25%, #45a049 25%, #45a049 50%, #4caf50 50%, #4caf50 75%, #45a049 75%, #45a049)',
    backgroundSize: '20px 20px',
    animation: 'progress-animation 1s linear infinite',
  },
  progressText: {
    textAlign: 'center' as const,
    fontSize: '1.1em',
    color: '#666',
  },
  realmsSection: {
    marginBottom: '40px',
  },
  realmGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  realmCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  realmHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  realmIcon: {
    fontSize: '2em',
    marginRight: '10px',
  },
  realmName: {
    fontSize: '1.2em',
    fontWeight: 'bold' as const,
    textTransform: 'capitalize' as const,
  },
  miniProgressBar: {
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  miniProgressFill: {
    height: '100%',
    transition: 'width 0.5s ease',
  },
  realmStats: {
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '0.9em',
  },
  statsSection: {
    marginBottom: '40px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
  },
  statCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '2em',
    fontWeight: 'bold' as const,
    color: '#2196f3',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '0.9em',
    color: '#666',
  },
  recentSection: {
    marginBottom: '40px',
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  recentItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  difficultyBadge: {
    padding: '2px 8px',
    borderRadius: '3px',
    color: 'white',
    fontSize: '0.8em',
    fontWeight: 'bold' as const,
  },
  motivationSection: {
    textAlign: 'center' as const,
    padding: '20px',
    backgroundColor: '#e3f2fd',
    borderRadius: '10px',
    fontSize: '1.2em',
    color: '#1976d2',
  },
};

export default ProgressDashboard;