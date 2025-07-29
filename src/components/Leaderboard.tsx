import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { soundManager } from '../utils/soundManager';

interface LeaderboardProps {
  onClose?: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const { leaderboard, gameStats, playerName, addLeaderboardEntry } = useContext(GameContext);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [nameInput, setNameInput] = useState(playerName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      addLeaderboardEntry(nameInput.trim());
      setShowSubmitForm(false);
      soundManager.playAchievement();
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}.`;
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const currentPlayerRank = leaderboard.findIndex(entry => 
    entry.score === gameStats.totalPoints && entry.name === playerName
  ) + 1;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>🏆 Leaderboard</h2>
          {onClose && (
            <button onClick={onClose} style={styles.closeButton}>×</button>
          )}
        </div>

        <div style={styles.currentStats}>
          <h3>Your Score: {gameStats.totalPoints} points</h3>
          <p>Level {gameStats.level} • {gameStats.totalChallengesCompleted} challenges completed</p>
          {currentPlayerRank > 0 && (
            <p style={styles.rankInfo}>Current Rank: #{currentPlayerRank}</p>
          )}
          {!showSubmitForm && !currentPlayerRank && (
            <button 
              onClick={() => setShowSubmitForm(true)}
              style={styles.submitButton}
            >
              Submit Your Score
            </button>
          )}
        </div>

        {showSubmitForm && (
          <form onSubmit={handleSubmit} style={styles.submitForm}>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              style={styles.nameInput}
              autoFocus
            />
            <div style={styles.formButtons}>
              <button type="submit" style={styles.saveButton}>Save Score</button>
              <button 
                type="button" 
                onClick={() => setShowSubmitForm(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div style={styles.leaderboardList}>
          {leaderboard.length === 0 ? (
            <p style={styles.emptyMessage}>No scores yet. Be the first!</p>
          ) : (
            leaderboard.slice(0, 10).map((entry, index) => (
              <div 
                key={entry.id}
                style={{
                  ...styles.leaderboardEntry,
                  ...(entry.name === playerName && entry.score === gameStats.totalPoints ? styles.currentPlayer : {}),
                }}
              >
                <div style={styles.rank}>{getRankEmoji(index + 1)}</div>
                <div style={styles.playerInfo}>
                  <div style={styles.playerName}>{entry.name}</div>
                  <div style={styles.playerStats}>
                    Level {entry.level} • {entry.challenges} challenges
                  </div>
                </div>
                <div style={styles.scoreInfo}>
                  <div style={styles.score}>{entry.score.toLocaleString()}</div>
                  <div style={styles.date}>{formatDate(entry.date)}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {leaderboard.length > 10 && (
          <p style={styles.moreInfo}>Showing top 10 of {leaderboard.length} players</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '2px solid #f0f0f0',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    color: '#333',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#999',
    padding: '0 10px',
    lineHeight: '1',
  },
  currentStats: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'center' as const,
  },
  rankInfo: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: '10px',
  },
  submitButton: {
    marginTop: '15px',
    padding: '10px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  submitForm: {
    padding: '20px',
    backgroundColor: '#fff3cd',
    borderBottom: '1px solid #ffeaa7',
  },
  nameInput: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    marginBottom: '15px',
  },
  formButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  saveButton: {
    padding: '10px 24px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: '10px 24px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  leaderboardList: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '20px',
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '18px',
    padding: '40px',
  },
  leaderboardEntry: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    transition: 'all 0.3s',
  },
  currentPlayer: {
    backgroundColor: '#e3f2fd',
    border: '2px solid #2196F3',
  },
  rank: {
    fontSize: '24px',
    fontWeight: 'bold',
    width: '50px',
    textAlign: 'center' as const,
  },
  playerInfo: {
    flex: 1,
    marginLeft: '15px',
  },
  playerName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  playerStats: {
    fontSize: '14px',
    color: '#666',
    marginTop: '2px',
  },
  scoreInfo: {
    textAlign: 'right' as const,
  },
  score: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  date: {
    fontSize: '12px',
    color: '#999',
    marginTop: '2px',
  },
  moreInfo: {
    textAlign: 'center' as const,
    padding: '15px',
    color: '#666',
    fontSize: '14px',
    borderTop: '1px solid #f0f0f0',
  },
};

export default Leaderboard;