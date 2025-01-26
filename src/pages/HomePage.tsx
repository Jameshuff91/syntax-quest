import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main style={styles.container}>
      <nav>
      <h1>Welcome to Syntax Quest!</h1>
      <p>Embark on a journey to master JavaScript, TypeScript, and React.</p>
      <Link to="/realm/javascript">
        <button style={styles.button}>Start Your Adventure</button>
      </Link>
      </nav>
    </main>
  );
};

const styles = {
  container: {
    textAlign: 'center' as 'center',
    padding: '50px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
};

export default HomePage;
