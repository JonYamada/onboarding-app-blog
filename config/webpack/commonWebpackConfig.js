// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const {webpackConfig: baseClientWebpackConfig, merge} = require('shakapacker')

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx', '.js', '.scss'],
  },
}

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions)

module.exports = commonWebpackConfig
