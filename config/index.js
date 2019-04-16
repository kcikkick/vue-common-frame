const path = require('path');
const BASE_DIR = path.join(__dirname, '../');

const CONFIG = {
  PORT: process.env.PORT || 9001,
  ROOT_DOMAIN: process.env.ROOT || '',
  LOG_DIR: process.env.LOG_DIR || 'D:\\gvvmc_log',
  build: {
    basePath: BASE_DIR,
    assetsPublicFolder:  'dist',
    assetsPublicPath: path.join(BASE_DIR, 'dist'),
    assetsRootPath: '/dist'
  },
  proxyTable: {
    '/api': {
      target: 'http://localhost:9003',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    }
  },
};

module.exports = CONFIG;