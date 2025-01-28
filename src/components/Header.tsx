import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
    console.log(isSignedIn ? 'Sign Out button clicked (mock functionality)' : 'Sign In button clicked (mock functionality)');
    // In a real implementation, this would trigger the Google OAuth flow or sign out flow
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Syntax Quest
        </Typography>
        <Button color="inherit" onClick={toggleSignIn}>
          {isSignedIn ? 'Sign Out' : 'Sign In'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;