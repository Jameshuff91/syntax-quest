// src/components/ChallengeCard.tsx

import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Challenge } from '../data/challenges';
import HintModal from './HintModal';
import Editor from './Editor';
import * as monaco from 'monaco-editor';
import { useCompiler } from '../hooks/useCompiler';
import { GameContext } from '../contexts/GameContext';
import SuccessAnimation from './SuccessAnimation';
import { soundManager } from '../utils/soundManager';
import { getEncouragementMessage } from '../utils/motivationalMessages';
import ChallengeTimer from './ChallengeTimer';

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
  const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<{ points: number; streak: number; perfectSolve: boolean; timeBonus: number }>({ points: 0, streak: 0, perfectSolve: false, timeBonus: 0 });
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [challengeTime, setChallengeTime] = useState<number>(0);
  const { addCompletedChallenge, incrementAttempt, attempts, gameStats, powerUps, consumeHintToken, consumeSkipToken, addPowerUp } = useContext(GameContext);
  const isTestingRealm = challenge.realm === 'testing' || challenge.realm === 'debugging';
  const { compile, result: compileResult, isLoading: isCompiling } = useCompiler(isTestingRealm);

  // Get difficulty-based colors
  const getDifficultyColors = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return {
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          borderColor: '#4caf50'
        };
      case 'medium':
        return {
          backgroundColor: '#fff3e0',
          color: '#ef6c00',
          borderColor: '#ff9800'
        };
      case 'hard':
        return {
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderColor: '#f44336'
        };
      default:
        return {
          backgroundColor: '#e0f7fa',
          color: '#00796b',
          borderColor: '#4dd0e1'
        };
    }
  };

  const difficultyColors = getDifficultyColors(challenge.difficulty);

  // Reset state when challenge changes
  useEffect(() => {
    setUserCode(challenge.starterCode);
    setShowHint(false);
    setCurrentHint(0);
    setResultMessage('');
    setIsSubmitting(false);
    setEditorKey(prev => prev + 1);
    setIsTimerActive(false);
    setChallengeTime(0);
  }, [challenge.id]);

  // Handle compilation results
  useEffect(() => {
    if (!compileResult || !isSubmitting) return;

    if (compileResult.success) {
      setIsTimerActive(false);
      const challengeAttempts = (attempts[challenge.id] || 0) + 1;
      const basePoints = { easy: 100, medium: 200, hard: 300 }[challenge.difficulty] || 100;
      const attemptMultiplier = Math.max(0.5, 1 - (challengeAttempts - 1) * 0.1);
      
      // Calculate time bonus
      const timeLimits = {
        easy: { gold: 30, silver: 60, bronze: 90 },
        medium: { gold: 60, silver: 120, bronze: 180 },
        hard: { gold: 120, silver: 240, bronze: 360 }
      };
      const limits = timeLimits[challenge.difficulty];
      let timeBonus = 0;
      if (challengeTime <= limits.gold) timeBonus = basePoints * 0.5; // 50% bonus
      else if (challengeTime <= limits.silver) timeBonus = basePoints * 0.25; // 25% bonus
      else if (challengeTime <= limits.bronze) timeBonus = basePoints * 0.1; // 10% bonus
      
      const points = Math.round(basePoints * attemptMultiplier + timeBonus);
      const isPerfect = challengeAttempts === 1;
      
      setSuccessData({
        points,
        streak: isPerfect ? gameStats.streak + 1 : 0,
        perfectSolve: isPerfect,
        timeBonus: Math.round(timeBonus),
      });
      setShowSuccess(true);
      setResultMessage('');
      
      // Play success sound
      soundManager.playSuccess();
      
      addCompletedChallenge(challenge.id, challengeAttempts, challenge.difficulty, Math.round(timeBonus));
      setTimeout(() => onSuccess(), 3000);
    } else {
      const encouragement = getEncouragementMessage();
      setResultMessage(`${encouragement} ${compileResult.output || ''}`);
      soundManager.playError();
      incrementAttempt(challenge.id);
      const nextHint = currentHint + 1;
      if (nextHint <= challenge.hints.length) {
        setCurrentHint(nextHint);
        setShowHint(true);
        
        if (attempts[challenge.id] >= 4) { // Check for 5th attempt (since attempts start at 0)
          setUserCode(challenge.solutionCode);
          setEditorKey(prev => prev + 1);
          setResultMessage("Here's the solution after 5 attempts. Study it and try to understand how it works!");
        }
      }
    }
    setIsSubmitting(false);
  }, [compileResult, isSubmitting, challenge.id, addCompletedChallenge, onSuccess, incrementAttempt, currentHint, challenge.hints.length, challenge.solutionCode, attempts, gameStats, challenge.difficulty]);

  // Handle code submission
  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isCompiling) return;

    soundManager.playClick();
    setIsSubmitting(true);
    setResultMessage('Testing your code...');
    
    // Use the secure sandbox to run tests
    compile(userCode, challenge.tests, 5000);
  }, [userCode, challenge.tests, isSubmitting, isCompiling, compile]);

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
    // Start timer on first edit
    if (!isTimerActive && newCode !== challenge.starterCode) {
      setIsTimerActive(true);
    }
  }, [isTimerActive, challenge.starterCode]);

  return (
    <div className="challenge-card" style={{
      ...styles.card,
      borderColor: difficultyColors.borderColor,
      borderWidth: '2px'
    }}>
      <div style={styles.header}>
        <h2 style={styles.title} onClick={() => onSelect(challenge.id)}>{challenge.title}</h2>
        <span style={{
          ...styles.difficultyBadge,
          backgroundColor: difficultyColors.backgroundColor,
          color: difficultyColors.color
        }}>{challenge.difficulty}</span>
      </div>
      <p style={styles.description}>{challenge.description}</p>
      
      <ChallengeTimer 
        isActive={isTimerActive}
        onTimeUpdate={setChallengeTime}
        difficulty={challenge.difficulty}
      />

      <Editor 
        key={editorKey}
        code={userCode} 
        onChange={handleCodeChange}
        editorDidMount={(editor) => setEditorInstance(editor as unknown as monaco.editor.IStandaloneCodeEditor)}
      />

      <div style={styles.buttonContainer}>
        <button 
          onClick={handleSubmit} 
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Testing...' : 'Submit'}
        </button>
        
        {powerUps.hintTokens > 0 && currentHint < challenge.hints.length && (
          <button
            onClick={() => {
              if (consumeHintToken()) {
                setCurrentHint(prev => Math.min(prev + 1, challenge.hints.length));
                setShowHint(true);
              }
            }}
            style={styles.hintButton}
          >
            🐡 Use Hint ({powerUps.hintTokens} left)
          </button>
        )}
        
        {powerUps.skipTokens > 0 && (
          <button
            onClick={() => {
              if (consumeSkipToken()) {
                // Award partial XP for skipping
                const partialAttempts = 5; // Treat as 5 attempts for XP calculation
                addCompletedChallenge(challenge.id, partialAttempts, challenge.difficulty, 0);
                onSuccess();
              }
            }}
            style={styles.skipButton}
          >
            ⏭️ Skip Challenge ({powerUps.skipTokens} left)
          </button>
        )}
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
      
      <SuccessAnimation 
        show={showSuccess}
        points={successData.points}
        streak={successData.streak}
        perfectSolve={successData.perfectSolve}
        attempts={(attempts[challenge.id] || 0) + 1}
        timeBonus={successData.timeBonus}
        completionTime={challengeTime}
        onComplete={() => setShowSuccess(false)}
      />
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '7.5px',
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
    marginBottom: '10px',
    lineHeight: '1.5',
    color: '#000', // Set text color to black
  },
  buttonContainer: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap' as const,
  },
  submitButton: {
    marginTop: '5px',
    padding: '5px 20px',
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
    marginTop: '5px',
  },
  errorMessage: {
    color: '#f44336',
    marginTop: '10px',
  },
  attempts: {
    color: '#666',
    fontSize: '14px',
    marginTop: '5px',
  },
  hintButton: {
    padding: '5px 15px',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1976D2',
    },
  },
  skipButton: {
    padding: '5px 15px',
    cursor: 'pointer',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#F57C00',
    },
  },
};

export default ChallengeCard;
