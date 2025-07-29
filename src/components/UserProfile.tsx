import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { soundManager } from '../utils/soundManager';

const avatars = [
  { id: 'ninja', emoji: '🥷', name: 'Code Ninja' },
  { id: 'wizard', emoji: '🧙‍♂️', name: 'Code Wizard' },
  { id: 'robot', emoji: '🤖', name: 'Code Bot' },
  { id: 'alien', emoji: '👽', name: 'Code Alien' },
  { id: 'astronaut', emoji: '👨‍🚀', name: 'Code Explorer' },
  { id: 'detective', emoji: '🕵️', name: 'Bug Detective' },
  { id: 'superhero', emoji: '🦸', name: 'Code Hero' },
  { id: 'pirate', emoji: '🏴‍☠️', name: 'Code Pirate' },
  { id: 'unicorn', emoji: '🦄', name: 'Code Unicorn' },
  { id: 'dragon', emoji: '🐉', name: 'Code Dragon' },
];

interface UserProfileProps {
  onClose?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { playerName, setPlayerName, playerAvatar, setPlayerAvatar, gameStats, completedChallenges, achievements } = useContext(GameContext);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(playerAvatar);

  const handleSave = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setPlayerAvatar(selectedAvatar);
      localStorage.setItem('syntaxQuestAvatar', selectedAvatar);
      setIsEditing(false);
      soundManager.playClick();
    }
  };

  const currentAvatar = avatars.find(a => a.id === selectedAvatar) || avatars[0];
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const completionRate = Math.round((completedChallenges.length / 100) * 100); // Assuming 100 total challenges

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Player Profile</h2>
          {onClose && (
            <button onClick={onClose} style={styles.closeButton}>×</button>
          )}
        </div>

        <div style={styles.profileSection}>
          <div style={styles.avatarSection}>
            <div style={styles.currentAvatar}>
              <span style={styles.avatarEmoji}>{currentAvatar.emoji}</span>
            </div>
            {!isEditing ? (
              <div style={styles.profileInfo}>
                <h3 style={styles.playerName}>{playerName || 'Anonymous Player'}</h3>
                <p style={styles.avatarName}>{currentAvatar.name}</p>
                <button onClick={() => setIsEditing(true)} style={styles.editButton}>
                  ✏️ Edit Profile
                </button>
              </div>
            ) : (
              <div style={styles.editSection}>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name"
                  style={styles.nameInput}
                  maxLength={20}
                />
                <div style={styles.buttonGroup}>
                  <button onClick={handleSave} style={styles.saveButton}>Save</button>
                  <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {isEditing && (
            <div style={styles.avatarGrid}>
              <h4 style={styles.gridTitle}>Choose Your Avatar</h4>
              <div style={styles.avatars}>
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    style={{
                      ...styles.avatarOption,
                      ...(selectedAvatar === avatar.id ? styles.selectedAvatar : {}),
                    }}
                    title={avatar.name}
                  >
                    <span style={styles.optionEmoji}>{avatar.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={styles.statsSection}>
          <h3 style={styles.statsTitle}>Career Stats</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{gameStats.level}</span>
              <span style={styles.statLabel}>Level</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{gameStats.totalPoints.toLocaleString()}</span>
              <span style={styles.statLabel}>Total XP</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{completedChallenges.length}</span>
              <span style={styles.statLabel}>Challenges</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{unlockedAchievements}</span>
              <span style={styles.statLabel}>Achievements</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{gameStats.bestStreak}</span>
              <span style={styles.statLabel}>Best Streak</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{completionRate}%</span>
              <span style={styles.statLabel}>Completion</span>
            </div>
          </div>
        </div>

        <div style={styles.badgeSection}>
          <h3 style={styles.badgeTitle}>Level Badges</h3>
          <div style={styles.badges}>
            {[1, 5, 10, 20, 30, 50].map((level) => (
              <div
                key={level}
                style={{
                  ...styles.badge,
                  ...(gameStats.level >= level ? styles.unlockedBadge : styles.lockedBadge),
                }}
              >
                <span style={styles.badgeIcon}>
                  {gameStats.level >= level ? '⭐' : '🔒'}
                </span>
                <span style={styles.badgeLevel}>Lvl {level}</span>
              </div>
            ))}
          </div>
        </div>
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
    maxHeight: '90vh',
    overflow: 'auto',
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
  },
  profileSection: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '30px',
  },
  currentAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  avatarEmoji: {
    fontSize: '64px',
  },
  profileInfo: {
    flex: 1,
  },
  playerName: {
    margin: '0 0 5px',
    fontSize: '24px',
    color: '#333',
  },
  avatarName: {
    margin: '0 0 15px',
    fontSize: '16px',
    color: '#666',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  editSection: {
    flex: 1,
  },
  nameInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  avatarGrid: {
    marginTop: '20px',
  },
  gridTitle: {
    margin: '0 0 15px',
    fontSize: '18px',
    color: '#333',
  },
  avatars: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
  },
  avatarOption: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  selectedAvatar: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
    transform: 'scale(1.1)',
  },
  optionEmoji: {
    fontSize: '32px',
  },
  statsSection: {
    padding: '30px',
  },
  statsTitle: {
    margin: '0 0 20px',
    fontSize: '20px',
    color: '#333',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
  },
  badgeSection: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
  },
  badgeTitle: {
    margin: '0 0 20px',
    fontSize: '20px',
    color: '#333',
  },
  badges: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap' as const,
  },
  badge: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    transition: 'all 0.3s',
  },
  unlockedBadge: {
    backgroundColor: '#FFD700',
    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
  },
  lockedBadge: {
    backgroundColor: '#e0e0e0',
    opacity: 0.6,
  },
  badgeIcon: {
    fontSize: '24px',
  },
  badgeLevel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default UserProfile;