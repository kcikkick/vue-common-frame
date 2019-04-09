'use strict';
/* eslint-disable */
const chalk = require('chalk');
const graceful = require('graceful');
const config = require('../config');
const express = require('./express');
const packageInfo = require('../package.json');

let server = null;

// this function is called when you want the server to die gracefully
// any other system level destroy function can be applied here
// i.e. wait for existing connections
const gracefulShutdown = () => {
  console.log(`Received shutdown signal, shutting down gracefully.`);
  server.close();
  process.exit();
  // if after
  setTimeout(function () {
    console.error(`Could not close connections in time, forcefully shutting down`);
    process.exit();
  }, 10 * 1000);
};

const initExpress = () => {
  return express.init();
};

const start = function (callback) {
  const app = initExpress();
  const serverUrl = `${process.env.NODE_ENV === 'secure' ? 'https://' : 'http://'}` + `${config.host}:${config.port}`;
  server = app.listen(config.port, () => {
    console.log(chalk.green(`APP name:         ${packageInfo.name}`));
    console.log(chalk.green(`APP version:      ${packageInfo.version}`));
    console.log(chalk.green(`Environment:      ${process.env.NODE_ENV}`));
    console.log(chalk.green(`Server:           ${serverUrl}`));
    console.log(chalk.green(`Server started successfully!`));
    if (callback) callback(app);
    // listen terminal signal and handle it .e.g. kill
    process.on('SIGTERM', gracefulShutdown);
    // listen INT signal  and handle it. e.g. Ctrl-C
    process.on('SIGINT', gracefulShutdown);
    graceful({
      servers: [app],
      error: function (err, throwErrorCount) {
        console.error('Graceful catch onuncaughtException: %d times, log error here, and system will be shutdown by Graceful, error is: %s ', throwErrorCount, err.stack);
      },
      killTimeout: '30s',
    });
  });
};

module.exports = {
  start,
};
