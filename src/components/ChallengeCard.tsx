// src/components/ChallengeCard.tsx

import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Challenge } from '../data/challenges';
import HintModal from './HintModal';
import Editor from './Editor';
import * as monaco from 'monaco-editor';
import { useCompiler } from '../hooks/useCompiler';
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
  const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { addCompletedChallenge, incrementAttempt, attempts } = useContext(GameContext);
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
  }, [challenge.id]);

  // Handle compilation results
  useEffect(() => {
    if (!compileResult || !isSubmitting) return;

    if (compileResult.success) {
      setResultMessage('Success! You solved it! 🎉');
      addCompletedChallenge(challenge.id);
      onSuccess();
    } else {
      setResultMessage(`Incorrect. Try again! ${compileResult.output || ''}`);
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
  }, [compileResult, isSubmitting, challenge.id, addCompletedChallenge, onSuccess, incrementAttempt, currentHint, challenge.hints.length, challenge.solutionCode, attempts]);

  // Handle code submission
  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isCompiling) return;

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
  }, []);

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
};

export default ChallengeCard;
