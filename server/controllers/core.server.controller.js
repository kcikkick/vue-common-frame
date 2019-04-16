
const renderPage = (req, res, views, title) => {
  res.render(views, {
    htmlWebpackPlugin: {
      title: `Feeder - ${title}`,
    },
  });
};

exports.renderHomePage = function (req, res) {
  renderPage(req, res, 'index', 'Home Page');
};