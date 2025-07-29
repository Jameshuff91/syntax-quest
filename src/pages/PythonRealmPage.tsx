import React, { useState, useContext } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { pythonChallenges } from '../data/pythonChallenges';
import { GameContext } from '../contexts/GameContext';

const PythonRealmPage: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const { completedChallenges } = useContext(GameContext);
  
  const currentChallenges = pythonChallenges.map(challenge => ({
    ...challenge,
    completed: completedChallenges.includes(challenge.id)
  }));

  const completedCount = currentChallenges.filter(c => c.completed).length;
  const progressPercentage = (completedCount / currentChallenges.length) * 100;

  const handleChallengeSuccess = (challengeId: string) => {
    console.log(`Challenge ${challengeId} completed!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🐍 Advanced Python</h1>
        <p style={styles.description}>
          Master advanced Python concepts: decorators, async/await, type hints, and more!
        </p>
      </div>

      <div style={styles.progressContainer}>
        <div style={styles.progressInfo}>
          <span>Progress: {completedCount} / {currentChallenges.length} challenges</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${progressPercentage}%`
            }}
          />
        </div>
      </div>

      <div style={styles.challengeList}>
        {currentChallenges.map((challenge) => (
          <ErrorBoundary key={challenge.id}>
            <ChallengeCard
              challenge={challenge}
              onSuccess={() => handleChallengeSuccess(challenge.id)}
              onSelect={(challengeId) => setSelectedChallenge(challengeId)}
            />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
  },
  title: {
    fontSize: '36px',
    margin: '0 0 10px',
    color: '#3776ab',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    margin: 0,
  },
  progressContainer: {
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  progressBar: {
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    height: '20px',
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#3776ab',
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.5s ease-in-out',
    background: 'linear-gradient(90deg, #3776ab 0%, #ffd43b 100%)',
  },
  challengeList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
};

export default PythonRealmPage;