const userDao = require('../database/dao/UserDao');
const { registerValidation } = require('../validation/validation.js');

exports.get_login = function(req, res) {
  return res.render('login');
};

exports.get_register_page = function(req, res) {
  return res.render('register');
};

exports.register_new_user = async function(req, res) {
  const result = registerValidation(req.body);
  if (result.error != null) {
    console.log(result.error);
    return res.status(400).send(result.error.details[0]);
  }

  try {
    await userDao.registerNewUser(req.body);
  } catch (err) {
    return res.status(400).send({ Error: err.message });
  }

  return res.send(result);
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
