const {defaults} = require('jest-config')
import type {Config} from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  moduleNameMapper: {"\\.(css|less|scss|sass)$": "<rootDir>app/javascript/bundles/assets/stylesheets/__mocks__/mockStyles"},
  notify: true,
  testEnvironment: 'jsdom',
  verbose: true,
}

export default config
