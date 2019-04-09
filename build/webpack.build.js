const webpack = require('webpack');
const webpackHelper = require('./webpack.helper');

const packageDev = (app, callback) => {
  const webpackConfig = require('@vue/cli-service/webpack.config');
  // update input/output
  console.log('nickckkkkkkkkk');
  const compiler = webpack(webpackConfig);
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  });

  const hotMiddleware = require("webpack-hot-middleware")(compiler);

  // serve webpack bundle output
  app.use(devMiddleware);
  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  if (callback) {
    callback();
  }
};

const packageProd = (app, callback) => {
  // const webpackConfig = require('./webpack.prod.conf');
};

const packageEnv = (app, callback) => {
  console.log('start the webpack');
  const env = process.env.NODE_ENV;
  webpackHelper.initDistFolder({
    homePage: './src/modules/homePage/homePage.js',
  });
  env === 'development' ? packageDev(app, callback) : packageProd(app, callback);
};

module.exports = {
  packageEnv,
};
