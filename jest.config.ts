import type {Config} from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js"
  },
  moduleNameMapper: {"\\.(css|less|scss|sass)$": "<rootDir>app/javascript/bundles/assets/stylesheets/__mocks__/mockStyles"},
  notify: true,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/config/webpack/test.js',
  ],
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
  ],
  verbose: true,
}

export default config
