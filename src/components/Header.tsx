import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
    console.log(isSignedIn ? 'Sign Out button clicked (mock functionality)' : 'Sign In button clicked (mock functionality)');
    // In a real implementation, this would trigger the Google OAuth flow or sign out flow
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{justifyContent: 'space-between'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              Syntax Quest
            </Typography>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/progress" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">📊 Progress</Button>
          </Link>
          <Button color="inherit" onClick={toggleSignIn}>
            {isSignedIn ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;