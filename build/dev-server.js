'use strict';
// console.log('111');
const app = require('../lib/app');
const webpack = require('./webpack.build');
app.start(function (app) {
  webpack.packageEnv(app);
  console.log('app is up');
});
