// src/pages/TestingRealmPage.tsx

import React, { useContext, useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { GameContext } from '../contexts/GameContext';
import { testingChallenges } from '../data/testingChallenges';
import Button from '@mui/material/Button';

const TestingRealmPage: React.FC = () => {
  const { completedChallenges } = useContext(GameContext);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [visibleChallengeIndex, setVisibleChallengeIndex] = useState<number>(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const handleChallengeSuccess = (challengeId: string) => {
    console.log(`Challenge ${challengeId} completed!`);
    setVisibleChallengeIndex(prevIndex => prevIndex + 1);
  };

  const realmChallenges = testingChallenges.filter(
    challenge => difficultyFilter === 'all' || challenge.difficulty === difficultyFilter
  );

  // Reset visible index when filter changes
  React.useEffect(() => {
    setVisibleChallengeIndex(0);
  }, [difficultyFilter]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🧪 Testing Realm</h1>
        <p style={styles.subtitle}>
          Master the art of testing! Learn unit tests, integration tests, and test-driven development.
        </p>
      </div>

      <div style={styles.infoBox}>
        <h3>Why Testing Matters:</h3>
        <ul>
          <li>🛡️ <strong>Catch bugs early</strong> - Tests find problems before users do</li>
          <li>📝 <strong>Document your code</strong> - Tests show how functions should work</li>
          <li>🔄 <strong>Refactor safely</strong> - Tests ensure changes don't break things</li>
          <li>💪 <strong>Build confidence</strong> - Well-tested code is reliable code</li>
        </ul>
      </div>

      <div style={styles.filterContainer}>
        <h3 style={styles.filterTitle}>Filter by Difficulty:</h3>
        <div style={styles.filterButtons}>
          <button
            style={{
              ...styles.filterButton,
              ...(difficultyFilter === 'all' ? styles.activeFilter : {})
            }}
            onClick={() => setDifficultyFilter('all')}
          >
            All
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(difficultyFilter === 'easy' ? styles.activeFilterEasy : {})
            }}
            onClick={() => setDifficultyFilter('easy')}
          >
            Easy
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(difficultyFilter === 'medium' ? styles.activeFilterMedium : {})
            }}
            onClick={() => setDifficultyFilter('medium')}
          >
            Medium
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(difficultyFilter === 'hard' ? styles.activeFilterHard : {})
            }}
            onClick={() => setDifficultyFilter('hard')}
          >
            Hard
          </button>
        </div>
      </div>
      
      {realmChallenges.length === 0 ? (
        <div style={styles.noChallenges}>
          <p>No challenges found for the selected difficulty level.</p>
        </div>
      ) : (
        realmChallenges.map((challenge, index) => (
          index === visibleChallengeIndex && (
            <ErrorBoundary key={challenge.id}>
              <ChallengeCard
                challenge={challenge}
                onSuccess={() => handleChallengeSuccess(challenge.id)}
                onSelect={(challengeId) => setSelectedChallenge(challengeId)}
              />
            </ErrorBoundary>
          )
        ))
      )}
      
      {completedChallenges.length > 0 && (
        <div style={styles.completed}>
          <h3>Completed Challenges: {completedChallenges.length}</h3>
        </div>
      )}
      
      <div style={styles.nextButtonContainer}>
        {visibleChallengeIndex > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setVisibleChallengeIndex(prevIndex => prevIndex - 1)}
            style={{ marginRight: '10px' }}
          >
            Previous Challenge
          </Button>
        )}
        {visibleChallengeIndex < realmChallenges.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setVisibleChallengeIndex(prevIndex => prevIndex + 1)}
          >
            Next Challenge
          </Button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    border: '2px solid #2196f3',
  },
  filterContainer: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  filterTitle: {
    marginTop: 0,
    marginBottom: '15px',
    color: '#333',
  },
  filterButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const,
  },
  filterButton: {
    padding: '8px 16px',
    border: '2px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold' as const,
    transition: 'all 0.3s ease',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    color: 'white',
    borderColor: '#2196F3',
  },
  activeFilterEasy: {
    backgroundColor: '#4caf50',
    color: 'white',
    borderColor: '#4caf50',
  },
  activeFilterMedium: {
    backgroundColor: '#ff9800',
    color: 'white',
    borderColor: '#ff9800',
  },
  activeFilterHard: {
    backgroundColor: '#f44336',
    color: 'white',
    borderColor: '#f44336',
  },
  noChallenges: {
    textAlign: 'center' as const,
    padding: '40px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#666',
  },
  completed: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#d4edda',
    borderRadius: '8px',
  },
  nextButtonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default TestingRealmPage;