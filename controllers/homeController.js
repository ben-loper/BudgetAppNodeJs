exports.index = function(req, res) {
	res.render('index');
};

exports.about = function(req, res) {
	res.render('about');
};

exports.route_unknown = function(req, res) {
	return res.render('error');
};
