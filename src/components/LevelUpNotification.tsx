import React, { useEffect, useState } from 'react';
import { getLevelUpMessage } from '../utils/motivationalMessages';

interface LevelUpNotificationProps {
  show: boolean;
  level: number;
  onComplete?: () => void;
}

const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({ show, level, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (show && level > 1) {
      setIsVisible(true);
      setMessage(getLevelUpMessage(level));
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, level, onComplete]);

  if (!isVisible) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.levelBadge}>
          <span style={styles.levelNumber}>{level}</span>
        </div>
        <h2 style={styles.message}>{message}</h2>
        <div style={styles.sparkles}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{
              ...styles.sparkle,
              animationDelay: `${i * 0.2}s`,
              left: `${20 + i * 12}%`,
            }}>✨</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed' as const,
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2000,
    animation: 'slideDown 0.5s ease-out',
  },
  content: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px 40px',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(76, 175, 80, 0.4)',
    textAlign: 'center' as const,
    minWidth: '300px',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  levelBadge: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
    animation: 'pulse 2s infinite',
  },
  levelNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  message: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  sparkles: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
  },
  sparkle: {
    position: 'absolute' as const,
    fontSize: '20px',
    animation: 'sparkle 2s ease-in-out infinite',
  },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideDown {
    from { 
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
    to { 
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes sparkle {
    0%, 100% { 
      opacity: 0;
      transform: translateY(0) scale(0);
    }
    50% { 
      opacity: 1;
      transform: translateY(-20px) scale(1);
    }
  }
`;
document.head.appendChild(styleSheet);

export default LevelUpNotification;