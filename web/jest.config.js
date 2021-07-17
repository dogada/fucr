module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testURL: 'http://localhost:3000/',
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1'
  }
}
