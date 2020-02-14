exports.index = function(req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
  } else {
    req.session.page_views = 1;
  }
  console.log(req.session.page_views);
  res.render('index');
};

exports.about = function(req, res) {
  res.render('about');
};
exports.destroy = function(req, res) {
  req.session.destroy(function(err) {
    return res.render('index');
  });
};
exports.route_unknown = function(req, res) {
  return res.status(404).render('error');
};
