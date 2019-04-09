'use strict';
const path = require('path');
const express = require('express');
const config = require('../config');
// const morgan = require('morgan');
const proxyMiddleware = require('http-proxy-middleware');

/**
 * 设置存放静态文件的目录，js/css/image
 * dist -> static -> js/css/img
 * @param app
 */
const initStaticResource = function (app) {
  const staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
  app.use(staticPath, express.static(`.${staticPath}`));
};

/**
 * init logger, cookie, parse request json and so on middleware for backend
 *
 * @param app
 */
const initMiddleware = function (app) {
  // https://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html
  // morgan.format('multiplePage', '[multiplePage] :method :url :status :from');
  // app.use(morgan('multiplePage'));
};


/**
 * 设置views文件夹为存放视图文件的目录，即存放模板文件的地方
 * dist -> views
 * @param app
 */
const initViewEngine = function (app) {
  app.engine('html', require('ejs').__express);
  app.set('view engine', 'html');
  const viewPath = path.posix.join('dist', config.build.assetsViewDirectory);
  app.set('views', path.resolve(viewPath));
};

/**
 * 初始化页面路由
 * @param app
 */
const initModulesServerRoutes = function (app) {
  require(path.resolve('server/routes/app.server.routes.js'))(app);
};

/**
 *
 * @param app
 */
const initAPIProxy = function (app) {
  const proxyTable = config.proxyTable;
  for (const apiContext in proxyTable) {
    let options = proxyTable[apiContext];
    if (typeof options === 'string') {
      options = {target: options};
    }
    app.use(proxyMiddleware(options.filter || apiContext, options));
  }
};

/**
 * 开发环境下的错误处理器，将错误信息渲染error模板并显示到浏览器中
 * @param app
 */
const initErrorHandler = function (app) {
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // 开发环境下的错误处理器，将错误信息渲染error模板并显示到浏览器中
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};

const init = function () {
  const app = express();
  initStaticResource(app);
  initMiddleware(app);
  initViewEngine(app);
  initModulesServerRoutes(app);
  initAPIProxy(app);
  initErrorHandler(app);
  return app;
};

module.exports = {
  init,
};
