
const renderPage = (req, res, views, title) => {
  res.render(views, {
    htmlWebpackPlugin: {
      title: `Webpack3 - ${title}`,
    },
  });
};

exports.renderHomePage = function (req, res) {
  renderPage(req, res, 'src/modules/homePage/homePage', 'Home Page');
};