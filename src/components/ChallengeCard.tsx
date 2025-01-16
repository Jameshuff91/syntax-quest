// src/components/ChallengeCard.tsx

import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Challenge } from '../data/challenges';
import HintModal from './HintModal';
import Editor from './Editor';
import { runTests } from '../utils/challengeUtils';
import { GameContext } from '../contexts/GameContext';

interface ChallengeCardProps {
  challenge: Challenge;
  onSuccess: () => void;
  onSelect: (challengeId: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSuccess, onSelect }) => {
  // State management
  const [userCode, setUserCode] = useState<string>(challenge.starterCode);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editorKey, setEditorKey] = useState<number>(0); // For forcing editor re-render
  const { addCompletedChallenge, incrementAttempt, attempts } = useContext(GameContext);

  // Reset state when challenge changes
  useEffect(() => {
    setUserCode(challenge.starterCode);
    setShowHint(false);
    setCurrentHint(0);
    setResultMessage('');
    setIsSubmitting(false);
    setEditorKey(prev => prev + 1);
  }, [challenge.id]);

  // Handle code submission
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setResultMessage('Testing your code...');

      const testResult = runTests(challenge.tests, userCode);

      if (testResult.success) {
        setResultMessage('Success! You solved it! 🎉');
        addCompletedChallenge(challenge.id);
        onSuccess();
      } else {
        setResultMessage(`Incorrect. Try again! ${testResult.message || ''}`);
        incrementAttempt(challenge.id);
        const nextHint = currentHint + 1;
        if (nextHint <= challenge.hints.length) {
          setCurrentHint(nextHint);
          setShowHint(true);
          
          if (attempts[challenge.id] >= 4) { // Check for 5th attempt (since attempts start at 0)
            setUserCode(challenge.solutionCode);
            setEditorKey(prev => prev + 1);
            setResultMessage("Here's the solution after 5 attempts. Study it and try to understand how it works!");
            return;
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setResultMessage(`Error running tests: ${error.message}`);
      } else {
        setResultMessage(`Error running tests: ${String(error)}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [userCode, challenge, currentHint, isSubmitting, addCompletedChallenge, incrementAttempt, onSuccess]);

  // Handle partial code acceptance
  const handleAcceptPartialCode = useCallback(() => {
    try {
      const hint = challenge.hints[currentHint - 1];
      if (hint?.revealCode) {
        setUserCode(hint.revealCode);
        setEditorKey(prev => prev + 1); // Force editor to re-render
      }
      setShowHint(false);
    } catch (error) {
      setResultMessage('Error applying partial code');
    }
  }, [challenge.hints, currentHint]);

  // Handle code changes
  const handleCodeChange = useCallback((newCode: string) => {
    setUserCode(newCode);
    setResultMessage(''); // Clear previous results
  }, []);

  return (
    <div className="challenge-card" style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title} onClick={() => onSelect(challenge.id)}>{challenge.title}</h2>
        <span style={styles.difficultyBadge}>{challenge.difficulty}</span>
      </div>
      <p style={styles.description}>{challenge.description}</p>

      <Editor 
        key={editorKey}
        code={userCode} 
        onChange={handleCodeChange}
      />

      <div style={styles.buttonContainer}>
        <button 
          onClick={handleSubmit} 
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Testing...' : 'Submit'}
        </button>
      </div>

      {resultMessage && (
        <p style={
          resultMessage.includes('Success') 
            ? styles.successMessage 
            : styles.errorMessage
        }>
          {resultMessage}
        </p>
      )}

      {showHint && currentHint <= challenge.hints.length && (
        <HintModal
          hint={challenge.hints[currentHint - 1]}
          onClose={() => setShowHint(false)}
          onAcceptPartialCode={handleAcceptPartialCode}
        />
      )}

      {attempts[challenge.id] > 0 && (
        <p style={styles.attempts}>
          Attempts: {attempts[challenge.id]}
        </p>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  title: {
    color: '#333',
    cursor: 'pointer',
    margin: 0,
  },
  difficultyBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'capitalize' as React.CSSProperties['textTransform'],
    backgroundColor: '#e0f7fa',
    color: '#00796b',
  },
  description: {
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  buttonContainer: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#45a049',
    },
    ':disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
  },
  successMessage: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  errorMessage: {
    color: '#f44336',
    marginTop: '10px',
  },
  attempts: {
    color: '#666',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default ChallengeCard;
