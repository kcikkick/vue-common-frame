const CONFIG = require('./config');

module.exports = {
  devServer: {
    port: CONFIG.PORT,
    proxy: CONFIG.proxyTable
  },
};
