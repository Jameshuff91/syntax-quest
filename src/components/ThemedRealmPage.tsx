import React from 'react';
import { RealmTheme } from '../utils/realmThemes';

interface ThemedRealmPageProps {
  theme: RealmTheme;
  children: React.ReactNode;
}

const ThemedRealmPage: React.FC<ThemedRealmPageProps> = ({ theme, children }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: theme.backgroundGradient,
      position: 'relative' as const,
      overflow: 'hidden',
    },
    pattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.pattern || 'none',
      pointerEvents: 'none' as const,
    },
    content: {
      position: 'relative' as const,
      zIndex: 1,
      padding: '20px',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '40px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: theme.primaryColor,
      marginBottom: '10px',
      textShadow: `2px 2px 4px rgba(0, 0, 0, 0.1)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
    },
    emoji: {
      fontSize: '56px',
      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))',
    },
    subtitle: {
      fontSize: '20px',
      color: theme.accentColor,
      opacity: 0.9,
    },
    decorativeOrb: {
      position: 'absolute' as const,
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${theme.primaryColor}20 0%, transparent 70%)`,
      filter: 'blur(40px)',
      animation: 'float 20s ease-in-out infinite',
    },
    orb1: {
      top: '-150px',
      left: '-150px',
      animationDelay: '0s',
    },
    orb2: {
      bottom: '-150px',
      right: '-150px',
      animationDelay: '10s',
    },
    orb3: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animationDelay: '5s',
    },
  };

  return (
    <div style={styles.container}>
      {/* Decorative orbs */}
      <div style={{ ...styles.decorativeOrb, ...styles.orb1 }} />
      <div style={{ ...styles.decorativeOrb, ...styles.orb2 }} />
      <div style={{ ...styles.decorativeOrb, ...styles.orb3 }} />
      
      {/* Pattern overlay */}
      <div style={styles.pattern} />
      
      {/* Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.emoji}>{theme.emoji}</span>
            {theme.name}
          </h1>
          <p style={styles.subtitle}>Master the art of {theme.name.replace(' Realm', '')}</p>
        </div>
        
        {children}
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(40px, 10px) scale(1.05);
          }
        }
        
        .challenge-card {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px);
          border: 2px solid ${theme.primaryColor}20 !important;
          transition: all 0.3s ease;
        }
        
        .challenge-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
          border-color: ${theme.primaryColor}40 !important;
        }
        
        button {
          transition: all 0.3s ease;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ThemedRealmPage;