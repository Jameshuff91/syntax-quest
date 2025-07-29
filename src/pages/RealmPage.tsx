import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { GameContext } from '../contexts/GameContext';
import { challenges } from '../data/challenges';
import { typescriptChallenges } from '../data/typescriptChallenges';
import { advancedTypescriptChallenges } from '../data/advancedTypescriptChallenges';
import { reactChallenges } from '../data/reactChallenges';
import Button from '@mui/material/Button';
import ThemedRealmPage from '../components/ThemedRealmPage';
import { getRealmTheme } from '../utils/realmThemes';

interface RealmPageProps {
  realmId?: string;
}

const RealmPage: React.FC<RealmPageProps> = ({ realmId: propRealmId }) => {
  const { realmId: paramRealmId } = useParams<{ realmId: string }>();
  const currentRealmId = propRealmId || paramRealmId;
  const { completedChallenges } = useContext(GameContext);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [visibleChallengeIndex, setVisibleChallengeIndex] = useState<number>(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const handleChallengeSuccess = (challengeId: string) => {
    // Handle challenge success logic
    console.log(`Challenge ${challengeId} completed!`);
    setVisibleChallengeIndex(prevIndex => prevIndex + 1); // Move to the next challenge
  };
  
  const challengeList = currentRealmId === 'typescript' 
    ? [...typescriptChallenges, ...advancedTypescriptChallenges] 
    : currentRealmId === 'react' 
    ? reactChallenges 
    : challenges;

  const realmChallenges = challengeList.filter(
    challenge => challenge.realm === currentRealmId && 
    (difficultyFilter === 'all' || challenge.difficulty === difficultyFilter)
  );

  // Reset visible index when filter changes
  React.useEffect(() => {
    setVisibleChallengeIndex(0);
  }, [difficultyFilter]);

  const handleSuccess = () => {
    // Additional success handling if needed
  };

  const theme = getRealmTheme(currentRealmId || 'javascript');

  return (
    <ThemedRealmPage theme={theme}>
      <div style={styles.container}>
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
        index === visibleChallengeIndex && ( // Conditionally render based on index
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
            style={{ marginRight: '10px' }} // Add some right margin
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
    </ThemedRealmPage>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
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

export default RealmPage;
