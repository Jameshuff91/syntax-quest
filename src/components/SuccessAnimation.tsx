import React, { useEffect, useState } from 'react';
import { getChallengeCompletionMessage } from '../utils/motivationalMessages';

interface SuccessAnimationProps {
  show: boolean;
  points: number;
  streak: number;
  perfectSolve: boolean;
  attempts?: number;
  timeBonus?: number;
  completionTime?: number;
  onComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  show, 
  points, 
  streak, 
  perfectSolve,
  attempts = 1,
  timeBonus = 0,
  completionTime = 0,
  onComplete 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [messages, setMessages] = useState<{ main: string; extra?: string; quote?: string }>({ main: '' });

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Get motivational message
      const completionMessages = getChallengeCompletionMessage(perfectSolve, streak, attempts);
      setMessages(completionMessages);
      
      // Generate confetti particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -50 - 20,
      }));
      setParticles(newParticles);
      
      // Auto-hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.successIcon}>✓</div>
        
        <h2 style={styles.title}>{messages.main || 'Challenge Complete!'}</h2>
        
        <div style={styles.pointsDisplay}>
          <span style={styles.pointsText}>+{points} XP</span>
          {timeBonus > 0 && (
            <div style={styles.timeBonusDisplay}>
              <span style={styles.timeBonusIcon}>⏱️</span>
              <span style={styles.timeBonusText}>+{timeBonus} Time Bonus!</span>
            </div>
          )}
        </div>
        
        {completionTime > 0 && (
          <div style={styles.completionTime}>
            Completed in {Math.floor(completionTime / 60)}:{(completionTime % 60).toString().padStart(2, '0')}
          </div>
        )}
        
        {perfectSolve && (
          <div style={styles.badge}>
            <span style={styles.badgeIcon}>⚡</span>
            Perfect Solve!
          </div>
        )}
        
        {messages.extra && (
          <div style={styles.extraMessage}>
            {messages.extra}
          </div>
        )}
        
        {messages.quote && (
          <div style={styles.quote}>
            {messages.quote}
          </div>
        )}
        
        {/* Confetti particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: `calc(50% + ${particle.x}px)`,
              top: '50%',
              transform: `translateY(${particle.y}px)`,
              backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][particle.id % 5],
            }}
          />
        ))}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    animation: 'slideIn 0.5s ease-out',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    minWidth: '300px',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    animation: 'bounce 0.6s ease-out',
    boxShadow: '0 4px 20px rgba(76,175,80,0.3)',
  },
  title: {
    margin: '0 0 20px',
    color: '#333',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  pointsDisplay: {
    margin: '20px 0',
    animation: 'slideUp 0.6s ease-out 0.3s both',
  },
  timeBonusDisplay: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  timeBonusIcon: {
    fontSize: '24px',
  },
  timeBonusText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FF9800',
  },
  completionTime: {
    fontSize: '16px',
    color: '#666',
    marginTop: '10px',
  },
  pointsText: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#FFD700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    margin: '10px',
    animation: 'slideUp 0.6s ease-out 0.4s both',
  },
  badgeIcon: {
    fontSize: '20px',
  },
  streakDisplay: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FF5722',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    margin: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    animation: 'slideUp 0.6s ease-out 0.5s both',
  },
  streakIcon: {
    fontSize: '24px',
  },
  extraMessage: {
    marginTop: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FF5722',
    animation: 'slideUp 0.6s ease-out 0.6s both',
  },
  quote: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontSize: '14px',
    fontStyle: 'italic' as const,
    color: '#666',
    maxWidth: '400px',
    margin: '20px auto 0',
    animation: 'slideUp 0.6s ease-out 0.7s both',
  },
  particle: {
    position: 'absolute' as const,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    animation: 'confetti 3s ease-out forwards',
    pointerEvents: 'none' as const,
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { 
      transform: translateY(-50px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes bounce {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideUp {
    from { 
      transform: translateY(20px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes confetti {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(300px) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

export default SuccessAnimation;