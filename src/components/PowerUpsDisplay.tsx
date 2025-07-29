import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';

const PowerUpsDisplay: React.FC = () => {
  const { powerUps, addPowerUp } = useContext(GameContext);
  const [showShop, setShowShop] = useState(false);

  const formatTimeRemaining = (expiry?: Date) => {
    if (!expiry) return '';
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    if (diff <= 0) return 'Expired';
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m remaining`;
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Power-Ups</h3>
      
      <div style={styles.powerUpsGrid}>
        <div style={styles.powerUpCard}>
          <span style={styles.icon}>💡</span>
          <span style={styles.count}>{powerUps.hintTokens}</span>
          <span style={styles.label}>Hints</span>
        </div>
        
        <div style={styles.powerUpCard}>
          <span style={styles.icon}>⏭️</span>
          <span style={styles.count}>{powerUps.skipTokens}</span>
          <span style={styles.label}>Skips</span>
        </div>
        
        {powerUps.doubleXPActive && (
          <div style={{...styles.powerUpCard, ...styles.activeBoost}}>
            <span style={styles.icon}>⚡</span>
            <span style={styles.boostText}>2X XP</span>
            <span style={styles.timer}>{formatTimeRemaining(powerUps.doubleXPExpiry)}</span>
          </div>
        )}
      </div>
      
      <div style={styles.info}>
        <p style={styles.infoText}>
          🎯 <strong>Hints:</strong> Reveal part of the solution
        </p>
        <p style={styles.infoText}>
          ⏩ <strong>Skips:</strong> Skip to next challenge with partial XP
        </p>
        <p style={styles.earnText}>
          💪 Earn power-ups by leveling up!
        </p>
        <p style={styles.levelRewards}>
          • Every 2 levels: +1 Hint Token<br/>
          • Every 5 levels: +1 Skip Token
        </p>
      </div>
      
      {showShop && (
        <div style={styles.shop}>
          <h4 style={styles.shopTitle}>Power-Up Shop (Coming Soon!)</h4>
          <p style={styles.shopText}>Earn coins to buy power-ups!</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 15px',
    color: '#333',
    fontSize: '20px',
  },
  powerUpsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '10px',
    marginBottom: '20px',
  },
  powerUpCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '2px solid #e0e0e0',
    transition: 'all 0.3s',
  },
  activeBoost: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffc107',
    animation: 'pulse 2s infinite',
  },
  icon: {
    fontSize: '32px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  label: {
    fontSize: '14px',
    color: '#666',
  },
  boostText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff9800',
  },
  timer: {
    fontSize: '12px',
    color: '#856404',
  },
  info: {
    backgroundColor: '#e3f2fd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
  },
  infoText: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#1565c0',
  },
  earnText: {
    margin: '10px 0 5px',
    fontSize: '14px',
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  levelRewards: {
    fontSize: '13px',
    color: '#2e7d32',
    marginLeft: '20px',
    lineHeight: '1.6',
  },
  shop: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center' as const,
  },
  shopTitle: {
    margin: '0 0 10px',
    color: '#666',
  },
  shopText: {
    color: '#999',
    fontSize: '14px',
  },
};

export default PowerUpsDisplay;