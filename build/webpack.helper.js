require('shelljs/global');
const path = require('path');
const config = require('../config');
const _ = require('lodash');
const glob = require('glob');




const getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  const urlRegex = new RegExp(`^(?:[a-z]+:)?//`, 'i');

  // The output array
  let output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  }
  else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    }
    else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (let i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '');
              }
            }
          }
          else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }
  return output;
};

/**
 * 初始化打包目录
 * dist -> static 存放静态资源文件
 *         --> css
 *         --> js
 *         --> img
 * dist -> view 存放html文件
 */
const initDistFolder = entries => {
  const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
  const viewPath = path.join(config.build.assetsRoot, config.build.assetsViewDirectory);
  /*eslint no-undef:0*/
  //prepare view and static folder
  rm('-rf', config.build.assetsRoot);
  //prepare view and static folder
  mkdir('-p', assetsPath);
  mkdir('-p', viewPath);

  // copy static content into dist
  // cp('-R', 'static/', assetsPath);
  cp('-Rf', `public/*`, assetsPath);

  //copy views from src/modules/ folders
  const folders = ls('-d', 'src/modules/*');
  folders.forEach(function (folder) {
    console.log(folder);
    const dest = `${viewPath}/${folder}`;
    mkdir('-p', dest);
    cp('-Rf', `${folder}/*.html`, dest);
  });
  //inject js into view file for development mode, for production env, inject via webpack directly
  if (process.env.NODE_ENV === 'development') {
    const views = getGlobbedPaths(`${viewPath}/**/*.html`);
    views.forEach(function (viewHtmlPath) {
      const viewName = viewHtmlPath.substring((viewHtmlPath.lastIndexOf('/') + 1), viewHtmlPath.lastIndexOf('.html'));
      if (entries[viewName]) {
        // inject the dependency js file into ejs file
        const scriptCode = `<script src='/dist/${viewName}.js'></script>`;
        sed('-i', /<\/body>/, `${scriptCode}</body>`, viewHtmlPath);
      }
    });
  }
};

module.exports = {
  initDistFolder,
};
