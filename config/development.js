const path = require('path');

module.exports = {
  build: {
    assetsRoot: path.resolve('dist'), //打包根目录
    assetsPublicPath: '/dist/', // 访问打包后的静态资源路径
    assetsSubDirectory: 'static', // 访问打包后js,css静态资源文件
    assetsViewDirectory: 'views', // 访问打包后html静态资源文件
    sourceMap: false,
  },
  port: 7778,
  rootDomain: '',
  proxyTable: {
    '/api': {
      target: 'http://localhost:7778',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    },
  },
};
