let userDao = require('../database/dao/UserDao');

exports.get_login = function(req, res) {
	res.render('login');
};

exports.get_users = async function(req, res) {
	let users = await userDao.prototype.getAllUsers();

	return res.json(users);
};
