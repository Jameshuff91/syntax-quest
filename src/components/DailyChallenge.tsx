import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import ChallengeCard from './ChallengeCard';
import { getDailyChallenge, isDailyChallengeCompleted, getDailyChallengeTimeRemaining } from '../utils/dailyChallenges';
import { soundManager } from '../utils/soundManager';

const DailyChallenge: React.FC = () => {
  const { completedChallenges } = useContext(GameContext);
  const [timeRemaining, setTimeRemaining] = useState(getDailyChallengeTimeRemaining());
  const [showChallenge, setShowChallenge] = useState(false);
  
  const dailyChallenge = getDailyChallenge();
  const isCompleted = isDailyChallengeCompleted(completedChallenges);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getDailyChallengeTimeRemaining());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleSuccess = () => {
    soundManager.playAchievement();
    setShowChallenge(false);
  };

  if (!dailyChallenge) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h2 style={styles.title}>⭐ Daily Challenge</h2>
          <span style={styles.timer}>⏰ {timeRemaining} remaining</span>
        </div>
        <div style={styles.bonusSection}>
          <span style={styles.bonusText}>Bonus XP: +{dailyChallenge.bonusXP}</span>
        </div>
      </div>

      {isCompleted ? (
        <div style={styles.completedMessage}>
          <span style={styles.checkmark}>✅</span>
          <p>Daily challenge completed! Come back tomorrow for a new one!</p>
        </div>
      ) : (
        <div>
          <p style={styles.description}>
            Complete today's challenge to earn bonus XP! New challenge every day at midnight.
          </p>
          {!showChallenge ? (
            <button 
              onClick={() => setShowChallenge(true)}
              style={styles.startButton}
            >
              Start Daily Challenge
            </button>
          ) : (
            <div style={styles.challengeWrapper}>
              <ChallengeCard
                challenge={dailyChallenge}
                onSuccess={handleSuccess}
                onSelect={() => {}}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff3cd',
    border: '2px solid #ffeaa7',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap' as const,
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  title: {
    margin: 0,
    color: '#856404',
    fontSize: '24px',
  },
  timer: {
    fontSize: '16px',
    color: '#856404',
    fontWeight: 'bold',
  },
  bonusSection: {
    backgroundColor: '#ffc107',
    padding: '8px 16px',
    borderRadius: '20px',
  },
  bonusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  description: {
    color: '#856404',
    marginBottom: '20px',
    fontSize: '16px',
  },
  completedMessage: {
    textAlign: 'center' as const,
    padding: '20px',
    backgroundColor: '#d4edda',
    borderRadius: '8px',
    color: '#155724',
  },
  checkmark: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '10px',
  },
  startButton: {
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
    ':hover': {
      backgroundColor: '#e0a800',
      transform: 'translateY(-2px)',
    },
  },
  challengeWrapper: {
    marginTop: '20px',
  },
};

export default DailyChallenge;