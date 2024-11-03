module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', 
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js' 
  }
};
