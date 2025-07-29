export interface RealmTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  backgroundGradient: string;
  accentColor: string;
  emoji: string;
  pattern?: string;
}

export const realmThemes: { [key: string]: RealmTheme } = {
  javascript: {
    name: 'JavaScript Realm',
    primaryColor: '#f7df1e',
    secondaryColor: '#323330',
    backgroundColor: '#faf8f3',
    backgroundGradient: 'linear-gradient(135deg, #faf8f3 0%, #fff9e6 100%)',
    accentColor: '#f0db4f',
    emoji: '⚡',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(247, 223, 30, 0.03) 10px, rgba(247, 223, 30, 0.03) 20px)'
  },
  typescript: {
    name: 'TypeScript Realm',
    primaryColor: '#3178c6',
    secondaryColor: '#ffffff',
    backgroundColor: '#f0f6ff',
    backgroundGradient: 'linear-gradient(135deg, #f0f6ff 0%, #e6f0ff 100%)',
    accentColor: '#235a97',
    emoji: '🔷',
    pattern: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(49, 120, 198, 0.03) 15px, rgba(49, 120, 198, 0.03) 30px)'
  },
  react: {
    name: 'React Realm',
    primaryColor: '#61dafb',
    secondaryColor: '#282c34',
    backgroundColor: '#f0faff',
    backgroundGradient: 'linear-gradient(135deg, #f0faff 0%, #e6f7ff 100%)',
    accentColor: '#149eca',
    emoji: '⚛️',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(97, 218, 251, 0.05) 0%, transparent 50%)'
  },
  python: {
    name: 'Python Realm',
    primaryColor: '#3776ab',
    secondaryColor: '#ffd43b',
    backgroundColor: '#f5f8fc',
    backgroundGradient: 'linear-gradient(135deg, #f5f8fc 0%, #fffef0 100%)',
    accentColor: '#306998',
    emoji: '🐍',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(55, 118, 171, 0.03) 20px, rgba(55, 118, 171, 0.03) 40px)'
  },
  nextjs: {
    name: 'Next.js Realm',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    backgroundColor: '#fafafa',
    backgroundGradient: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    accentColor: '#333333',
    emoji: '▲',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(0, 0, 0, 0.02) 25px, rgba(0, 0, 0, 0.02) 50px)'
  },
  testing: {
    name: 'Testing Realm',
    primaryColor: '#9c27b0',
    secondaryColor: '#e1bee7',
    backgroundColor: '#faf5fc',
    backgroundGradient: 'linear-gradient(135deg, #faf5fc 0%, #f3e5f5 100%)',
    accentColor: '#7b1fa2',
    emoji: '🧪',
    pattern: 'repeating-conic-gradient(from 45deg at 10% 50%, transparent 0deg, rgba(156, 39, 176, 0.03) 90deg, transparent 180deg)'
  },
  debugging: {
    name: 'Debugging Realm',
    primaryColor: '#ff5722',
    secondaryColor: '#ffccbc',
    backgroundColor: '#fff5f3',
    backgroundGradient: 'linear-gradient(135deg, #fff5f3 0%, #ffebe7 100%)',
    accentColor: '#e64a19',
    emoji: '🐛',
    pattern: 'repeating-linear-gradient(135deg, transparent, transparent 15px, rgba(255, 87, 34, 0.03) 15px, rgba(255, 87, 34, 0.03) 30px)'
  },
  helm: {
    name: 'Helm/K8s Realm',
    primaryColor: '#0f1689',
    secondaryColor: '#326ce5',
    backgroundColor: '#f0f4ff',
    backgroundGradient: 'linear-gradient(135deg, #f0f4ff 0%, #e8efff 100%)',
    accentColor: '#091a7a',
    emoji: '⎈',
    pattern: 'repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(15, 22, 137, 0.03) 30px, rgba(15, 22, 137, 0.03) 60px)'
  },
  terraform: {
    name: 'Terraform Realm',
    primaryColor: '#7c4dff',
    secondaryColor: '#b388ff',
    backgroundColor: '#f8f5ff',
    backgroundGradient: 'linear-gradient(135deg, #f8f5ff 0%, #ede7f6 100%)',
    accentColor: '#6200ea',
    emoji: '🏗️',
    pattern: 'repeating-linear-gradient(-60deg, transparent, transparent 20px, rgba(124, 77, 255, 0.03) 20px, rgba(124, 77, 255, 0.03) 40px)'
  },
  cloudcli: {
    name: 'Cloud CLI Realm',
    primaryColor: '#ff9100',
    secondaryColor: '#4285f4',
    backgroundColor: '#fffaf0',
    backgroundGradient: 'linear-gradient(135deg, #fffaf0 0%, #fff3e0 100%)',
    accentColor: '#ff6d00',
    emoji: '☁️',
    pattern: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 10px, rgba(255, 145, 0, 0.03) 10px, rgba(255, 145, 0, 0.03) 20px)'
  }
};

export const getRealmTheme = (realm: string): RealmTheme => {
  return realmThemes[realm] || realmThemes.javascript;
};