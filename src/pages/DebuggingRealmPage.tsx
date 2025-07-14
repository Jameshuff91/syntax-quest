// src/pages/DebuggingRealmPage.tsx

import React, { useContext, useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { GameContext } from '../contexts/GameContext';
import { debuggingChallenges } from '../data/debuggingChallenges';
import Button from '@mui/material/Button';

const DebuggingRealmPage: React.FC = () => {
  const { completedChallenges } = useContext(GameContext);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [visibleChallengeIndex, setVisibleChallengeIndex] = useState<number>(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const handleChallengeSuccess = (challengeId: string) => {
    console.log(`Challenge ${challengeId} completed!`);
    setVisibleChallengeIndex(prevIndex => prevIndex + 1);
  };

  const realmChallenges = debuggingChallenges.filter(
    challenge => difficultyFilter === 'all' || challenge.difficulty === difficultyFilter
  );

  // Reset visible index when filter changes
  React.useEffect(() => {
    setVisibleChallengeIndex(0);
  }, [difficultyFilter]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🐛 Debugging Realm</h1>
        <p style={styles.subtitle}>
          Master the art of debugging! Learn to trace code execution, find bugs, and understand how JavaScript works.
        </p>
      </div>

      <div style={styles.infoBox}>
        <h3>Debugging Skills You'll Learn:</h3>
        <ul>
          <li>🔍 <strong>Code Tracing</strong> - Follow execution step by step</li>
          <li>🐞 <strong>Bug Identification</strong> - Spot common programming errors</li>
          <li>📦 <strong>Scope Understanding</strong> - Master variable scoping</li>
          <li>⏱️ <strong>Async Debugging</strong> - Understand execution order</li>
          <li>💾 <strong>Memory Issues</strong> - Identify and fix memory leaks</li>
        </ul>
      </div>

      <div style={styles.debugTips}>
        <h3>🛠️ Debugging Tips:</h3>
        <div style={styles.tipGrid}>
          <div style={styles.tip}>
            <strong>1. Read Error Messages</strong>
            <p>Error messages tell you what went wrong and where. Always read them carefully!</p>
          </div>
          <div style={styles.tip}>
            <strong>2. Use Console.log</strong>
            <p>Print variables at different points to see how values change.</p>
          </div>
          <div style={styles.tip}>
            <strong>3. Think Like the Computer</strong>
            <p>Trace through code line by line, tracking variable values.</p>
          </div>
          <div style={styles.tip}>
            <strong>4. Isolate the Problem</strong>
            <p>Comment out code to find which part causes the issue.</p>
          </div>
        </div>
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
    backgroundColor: '#fff3e0',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    border: '2px solid #ff9800',
  },
  debugTips: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  tipGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  tip: {
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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

export default DebuggingRealmPage;