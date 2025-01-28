import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main style={styles.container}>
      
      <h1>Welcome to Syntax Quest!</h1>
      <p>Embark on a journey to master JavaScript, TypeScript, and React.</p>
      <div style={styles.buttonGrid}>
        <Link to="/realm/javascript">
          <button style={styles.adventureButton}>Start Javascript Adventure</button>
        </Link>
        <Link to="/realm/typescript">
          <button style={styles.adventureButton}>Start Typescript Adventure</button>
        </Link>
        <Link to="/realm/react">
          <button style={styles.adventureButton}>Start React Adventure</button>
        </Link>
        <Link to="/realm/nextjs">
          <button style={styles.adventureButton}>Start Next.js Adventure</button>
        </Link>
      </div>
      <div style={styles.movingBar}></div>
    </main>
  );
};

const styles = {
  container: {
    textAlign: 'center' as 'center',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative' as 'relative', // Needed for absolute positioning of movingBar
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
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
};

export default HomePage;

