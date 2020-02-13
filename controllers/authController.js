let userDao = require('../database/dao/UserDao');

exports.get_login = function(req, res) {
  return res.render('login');
};

exports.get_register_page = function(req, res) {
  return res.render('register');
};

exports.register_new_user = async function(req, res) {
  let successful = await userDao.registerNewUser(req.body);
  if (!successful) {
    res.status(500);

    return res.render('register');
  }
  return res.render('register');
};

exports.get_users = async function(req, res) {
  let users = await userDao.getAllUsers();

  return res.json(users);
};

exports.log_in_user = async function(req, res) {
  let result = await userDao.loginUser(req.body);
  // console.log(result);
  if (result === null || result === undefined || result === false) {
    // console.log('login not successful');
    res.status(401);
    return res.render('login');
  } else {
    console.log('login success!');
    return res.send();
  }
};

exports.success = function(req, res) {
  return res.render('success');
};
