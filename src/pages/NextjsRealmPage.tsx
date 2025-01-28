import React, { useContext, useState } from 'react';
import { nextjsChallenges } from '../data/nextjsChallenges';
import { useParams } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';
import { GameContext } from '../contexts/GameContext';
import Button from '@mui/material/Button';

interface RealmPageProps {
  realmId?: string;
}


interface RealmPageProps {
  realmId?: string;
}

const NextjsRealmPage: React.FC<RealmPageProps> = ({ realmId: propRealmId }) => {
  const { realmId: paramRealmId } = useParams<{ realmId: string }>();
  const currentRealmId = propRealmId || paramRealmId;
  const { completedChallenges } = useContext(GameContext);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [visibleChallengeIndex, setVisibleChallengeIndex] = useState<number>(0);

  const handleChallengeSuccess = (challengeId: string) => {
    // Handle challenge success logic
    console.log(`Challenge ${challengeId} completed!`);
    setVisibleChallengeIndex(prevIndex => prevIndex + 1); // Move to the next challenge
  };
  
  const challengeList = nextjsChallenges;

  const realmChallenges = challengeList.filter(
    challenge => challenge.category.toLowerCase() === 'next.js'
  );

  const handleSuccess = () => {
    // Additional success handling if needed
  };

  return (
    <div style={styles.container}>
      {realmChallenges.map((challenge, index) => (
        index === visibleChallengeIndex && ( // Conditionally render based on index
          <ChallengeCard
            key={challenge.id}
            challenge={{ ...challenge, difficulty: 'easy' as 'easy' }}
            onSuccess={() => handleChallengeSuccess(challenge.id)}
            onSelect={(challengeId) => setSelectedChallenge(challengeId)}
          />
        )
      ))}
      
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
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
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

export default NextjsRealmPage;