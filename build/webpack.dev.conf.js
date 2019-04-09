const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const otherWebpackConfig = {
  entry: {
    homePage: './src/modules/homePage/homePage.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.rootDomain + config.build.assetsPublicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'homePage.html',
      template: './src/modules/homePage/homePage.html',
      inject: true,
    }),
  ],
};

module.exports = {
  otherWebpackConfig
};
