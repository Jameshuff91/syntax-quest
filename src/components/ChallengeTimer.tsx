import React, { useState, useEffect, useRef } from 'react';

interface ChallengeTimerProps {
  isActive: boolean;
  onTimeUpdate: (seconds: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const ChallengeTimer: React.FC<ChallengeTimerProps> = ({ isActive, onTimeUpdate, difficulty }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Time limits for bonus points (in seconds)
  const timeLimits = {
    easy: { gold: 30, silver: 60, bronze: 90 },
    medium: { gold: 60, silver: 120, bronze: 180 },
    hard: { gold: 120, silver: 240, bronze: 360 }
  };

  const limits = timeLimits[difficulty];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          const newTime = prev + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setSeconds(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeBonus = () => {
    if (seconds <= limits.gold) return { emoji: '⚡', label: 'Lightning Fast!', color: '#FFD700' };
    if (seconds <= limits.silver) return { emoji: '🥈', label: 'Quick Solver!', color: '#C0C0C0' };
    if (seconds <= limits.bronze) return { emoji: '🥉', label: 'Good Time!', color: '#CD7F32' };
    return { emoji: '⏱️', label: 'Keep Going!', color: '#666' };
  };

  const bonus = getTimeBonus();
  const progressPercentage = Math.min((seconds / limits.bronze) * 100, 100);

  return (
    <div style={styles.container}>
      <div style={styles.timerDisplay}>
        <span style={styles.time}>{formatTime(seconds)}</span>
        <span style={{ ...styles.bonus, color: bonus.color }}>
          {bonus.emoji} {bonus.label}
        </span>
      </div>
      
      <div style={styles.progressBar}>
        <div 
          style={{
            ...styles.progressFill,
            width: `${progressPercentage}%`,
            backgroundColor: progressPercentage < 33 ? '#4CAF50' : 
                           progressPercentage < 66 ? '#FF9800' : '#f44336'
          }}
        />
        
        {/* Time markers */}
        <div style={{ ...styles.marker, left: `${(limits.gold / limits.bronze) * 100}%` }}>
          <div style={styles.markerLine} />
          <span style={styles.markerLabel}>⚡</span>
        </div>
        <div style={{ ...styles.marker, left: `${(limits.silver / limits.bronze) * 100}%` }}>
          <div style={styles.markerLine} />
          <span style={styles.markerLabel}>🥈</span>
        </div>
      </div>
      
      <div style={styles.timeLimits}>
        <span style={styles.limit}>⚡ {formatTime(limits.gold)}</span>
        <span style={styles.limit}>🥈 {formatTime(limits.silver)}</span>
        <span style={styles.limit}>🥉 {formatTime(limits.bronze)}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  timerDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  time: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#333',
  },
  bonus: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  progressBar: {
    position: 'relative' as const,
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    height: '10px',
    overflow: 'visible',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '10px',
    transition: 'width 1s linear, background-color 0.3s ease',
  },
  marker: {
    position: 'absolute' as const,
    top: '-5px',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  markerLine: {
    width: '2px',
    height: '20px',
    backgroundColor: '#999',
  },
  markerLabel: {
    fontSize: '12px',
    marginTop: '2px',
  },
  timeLimits: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '12px',
    color: '#666',
  },
  limit: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
};

export default ChallengeTimer;