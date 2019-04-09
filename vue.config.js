const webpackDevConf = require('./build/webpack.dev.conf.js');

module.exports = {
  lintOnSave: true,
  configureWebpack: config => {
    debugger;
    // console.log(config);
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    }
    else {
      // 为开发环境修改配置...
      config.entry = webpackDevConf.otherWebpackConfig.entry;
      config.output = webpackDevConf.otherWebpackConfig.output;
      Array.prototype.push.apply(config.plugins, webpackDevConf.otherWebpackConfig.plugins);
    }
  }
};
