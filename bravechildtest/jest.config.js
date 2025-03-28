module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js"
    },
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    }
  };