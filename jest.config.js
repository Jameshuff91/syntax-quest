module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest', 
      {
        presets: ['react-app'],
        plugins: ['@babel/plugin-transform-class-static-block']
      }
    ],
    '^.+\\.css$': '<rootDir>/jest/cssTransform.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-monaco-editor|monaco-editor)/)'
  ],
  moduleNameMapper: {
    '^monaco-editor$': '<rootDir>/node_modules/monaco-editor/esm/vs/editor/editor.api.js',
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  modulePaths: ['<rootDir>/src']
};
