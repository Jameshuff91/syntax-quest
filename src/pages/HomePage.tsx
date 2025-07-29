import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import GameStats from '../components/GameStats';
import Achievements from '../components/Achievements';
import RealmProgress from '../components/RealmProgress';
import Leaderboard from '../components/Leaderboard';
import DailyChallenge from '../components/DailyChallenge';
import PowerUpsDisplay from '../components/PowerUpsDisplay';
import { GameContext } from '../contexts/GameContext';

const HomePage: React.FC = () => {
  const { playerName } = useContext(GameContext);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <main style={styles.container}>
      
      <h1>Welcome to Syntax Quest{playerName ? `, ${playerName}` : ''}!</h1>
      <p>Embark on a journey to master JavaScript, TypeScript, React, Testing, and Debugging!</p>
      
      <GameStats />
      <PowerUpsDisplay />
      <DailyChallenge />
      <RealmProgress />
      <Achievements />
      
      <div style={styles.leaderboardSection}>
        <button 
          onClick={() => setShowLeaderboard(true)}
          style={styles.leaderboardButton}
        >
          🏆 View Leaderboard
        </button>
      </div>
      
      <div style={styles.buttonGrid}>
        <Link to="/realm/javascript">
          <button style={styles.adventureButton}>Start Javascript Adventure</button>
        </Link>
        <Link to="/realm/typescript">
          <button style={styles.adventureButton}>Start Typescript Adventure</button>
        </Link>
        <Link to="/realm/python">
          <button style={{...styles.adventureButton, backgroundColor: '#3776ab'}}>🐍 Start Python Adventure</button>
        </Link>
        <Link to="/realm/react">
          <button style={styles.adventureButton}>Start React Adventure</button>
        </Link>
        <Link to="/realm/nextjs">
          <button style={styles.adventureButton}>Start Next.js Adventure</button>
        </Link>
        <Link to="/realm/testing">
          <button style={{...styles.adventureButton, backgroundColor: '#9c27b0'}}>🧪 Start Testing Adventure</button>
        </Link>
        <Link to="/realm/debugging">
          <button style={{...styles.adventureButton, backgroundColor: '#ff5722'}}>🐛 Start Debugging Adventure</button>
        </Link>
        <Link to="/realm/helm">
          <button style={{...styles.adventureButton, backgroundColor: '#0f1689'}}>⎈ Start Helm/K8s Adventure</button>
        </Link>
        <Link to="/realm/terraform">
          <button style={{...styles.adventureButton, backgroundColor: '#7c4dff'}}>🏗️ Start Terraform Adventure</button>
        </Link>
        <Link to="/realm/cloudcli">
          <button style={{...styles.adventureButton, backgroundColor: '#ff9100'}}>☁️ Start Cloud CLI Adventure</button>
        </Link>
      </div>
      <div style={styles.movingBar}></div>
      
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </main>
  );
};

const styles = {
  container: {
    textAlign: 'center' as 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative' as 'relative', // Needed for absolute positioning of movingBar
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  adventureButton: {
    padding: '15px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  movingBar: {
    position: 'absolute' as 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '5px',
    background: 'linear-gradient(to right, #4CAF50, white)',
    animation: 'moveBar 3s linear infinite alternate',
  },
  '@keyframes moveBar': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  leaderboardSection: {
    margin: '20px 0',
    textAlign: 'center' as 'center',
  },
  leaderboardButton: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#FFD700',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(255, 215, 0, 0.4)',
    },
  },
};

export default HomePage;

