import React, { useContext, useMemo } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Link } from 'react-router-dom';

interface RealmData {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalChallenges: number;
}

const realms: RealmData[] = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨', color: '#f7df1e', totalChallenges: 10 },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', color: '#3178c6', totalChallenges: 20 },
  { id: 'python', name: 'Python', icon: '🐍', color: '#3776ab', totalChallenges: 10 },
  { id: 'react', name: 'React', icon: '⚛️', color: '#61dafb', totalChallenges: 10 },
  { id: 'nextjs', name: 'Next.js', icon: '▲', color: '#000000', totalChallenges: 10 },
  { id: 'testing', name: 'Testing', icon: '🧪', color: '#9c27b0', totalChallenges: 10 },
  { id: 'debugging', name: 'Debugging', icon: '🐛', color: '#ff5722', totalChallenges: 10 },
  { id: 'helm', name: 'Helm/K8s', icon: '⎈', color: '#0f1689', totalChallenges: 10 },
  { id: 'terraform', name: 'Terraform', icon: '🏗️', color: '#7c4dff', totalChallenges: 10 },
  { id: 'cloudcli', name: 'Cloud CLI', icon: '☁️', color: '#ff9100', totalChallenges: 10 },
];

const RealmProgress: React.FC = () => {
  const { completedChallenges } = useContext(GameContext);

  const realmProgress = useMemo(() => {
    return realms.map(realm => {
      const completed = completedChallenges.filter(id => 
        id.toLowerCase().includes(realm.id) || 
        id.startsWith(`${realm.id}-`)
      ).length;
      
      const percentage = (completed / realm.totalChallenges) * 100;
      
      return {
        ...realm,
        completed,
        percentage,
        isCompleted: completed === realm.totalChallenges,
      };
    });
  }, [completedChallenges]);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Realm Progress</h3>
      
      <div style={styles.realmsGrid}>
        {realmProgress.map((realm) => (
          <Link 
            key={realm.id} 
            to={`/realm/${realm.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div 
              style={{
                ...styles.realmCard,
                borderColor: realm.color,
                ...(realm.isCompleted && styles.completedCard),
              }}
            >
              <div style={styles.realmHeader}>
                <span style={styles.realmIcon}>{realm.icon}</span>
                <div style={styles.realmInfo}>
                  <h4 style={styles.realmName}>{realm.name}</h4>
                  <span style={styles.completedText}>
                    {realm.completed} / {realm.totalChallenges}
                  </span>
                </div>
              </div>
              
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${realm.percentage}%`,
                    backgroundColor: realm.color,
                  }}
                />
              </div>
              
              {realm.isCompleted && (
                <div style={styles.completedBadge}>
                  <span style={styles.completedIcon}>👑</span>
                  Conquered!
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      <div style={styles.totalProgress}>
        <span style={styles.totalText}>
          Total Progress: {completedChallenges.length} / {realms.reduce((sum, r) => sum + r.totalChallenges, 0)} Challenges
        </span>
        <div style={styles.totalProgressBar}>
          <div 
            style={{
              ...styles.totalProgressFill,
              width: `${(completedChallenges.length / realms.reduce((sum, r) => sum + r.totalChallenges, 0)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 20px',
    color: '#333',
    fontSize: '20px',
  },
  realmsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  },
  realmCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    border: '2px solid',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  completedCard: {
    background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
  },
  realmHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px',
  },
  realmIcon: {
    fontSize: '32px',
  },
  realmInfo: {
    flex: 1,
  },
  realmName: {
    margin: 0,
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
  },
  completedText: {
    fontSize: '14px',
    color: '#666',
  },
  progressBar: {
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    height: '8px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.5s ease-in-out',
  },
  completedBadge: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    backgroundColor: '#FFD700',
    color: '#333',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  completedIcon: {
    fontSize: '14px',
  },
  totalProgress: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  totalText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    display: 'block',
    marginBottom: '10px',
  },
  totalProgressBar: {
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    height: '12px',
    overflow: 'hidden',
  },
  totalProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: '10px',
    transition: 'width 0.5s ease-in-out',
    background: 'linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)',
  },
};

export default RealmProgress;