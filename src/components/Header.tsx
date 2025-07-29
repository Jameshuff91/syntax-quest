import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import UserProfile from './UserProfile';
import { GameContext } from '../contexts/GameContext';

const Header: React.FC = () => {
  const { playerAvatar } = useContext(GameContext);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const avatars: { [key: string]: string } = {
    'ninja': '🥷',
    'wizard': '🧙‍♂️',
    'robot': '🤖',
    'alien': '👽',
    'astronaut': '👨‍🚀',
    'detective': '🕵️',
    'superhero': '🦸',
    'pirate': '🏴‍☠️',
    'unicorn': '🦄',
    'dragon': '🐉',
  };

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
    console.log(isSignedIn ? 'Sign Out button clicked (mock functionality)' : 'Sign In button clicked (mock functionality)');
    // In a real implementation, this would trigger the Google OAuth flow or sign out flow
  };

  return (
    <>
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
            <Button color="inherit" onClick={() => setShowLeaderboard(true)}>
              🏆 Leaderboard
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setShowProfile(true)}
              style={{ fontSize: '20px', minWidth: '48px' }}
            >
              {avatars[playerAvatar] || '🥷'}
            </Button>
            <Button color="inherit" onClick={toggleSignIn}>
              {isSignedIn ? 'Sign Out' : 'Sign In'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Header;