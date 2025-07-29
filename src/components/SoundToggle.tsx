import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

const SoundToggle: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.toggleSound(newState);
    
    // Play a click sound if we're enabling sound
    if (newState) {
      setTimeout(() => soundManager.playClick(), 100);
    }
  };

  return (
    <button
      onClick={handleToggle}
      style={styles.button}
      title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
};

const styles = {
  button: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    border: '2px solid #ddd',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    ':hover': {
      backgroundColor: '#e0e0e0',
      transform: 'scale(1.1)',
    },
  },
};

export default SoundToggle;