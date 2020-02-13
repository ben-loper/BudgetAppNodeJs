let encryptionHelper = require('../../utilities/encryptionHelper.js');
let User = require('../models/AppUser');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ProdDb',
  password: 'postgres',
  port: 5432
});

pool.connect();

exports.getAllUsers = async function() {
  let users = [];

  await pool
    .query('SELECT * FROM app_user')
    .then(res => {
      if (res.rows.length > 0) {
        res.rows.forEach(record => {
          let user = new User();

          user.id = record.id;
          user.email = record.email;
          user.password = record.password;
          user.isActive = record.is_active;
          user.firstName = record.first_name;
          user.lastName = record.last_name;
          user.username = record.username;

          console.log(user);
          users.push(user);
        });
      }
    })
    .catch(e => console.log(e.stack));

  return users;
};

exports.registerNewUser = async function(user) {
  let users = [];
  // Generate salt to be stored in the DB
  let salt = await encryptionHelper.generateHash();
  let hash = await encryptionHelper.generateHash(user.password, salt);

  const text = `INSERT INTO app_user (username, password, email, first_name, last_name) VALUES($1, $2, $3, $4, $5, $6) RETURNING * `;
  const values = [
    user.username.toLowerCase(),
    hash,
    user.email.toLowerCase(),
    user.firstName,
    user.lastName,
    salt
  ];

  await pool
    .query(text, values)
    .then(res => {
      return true;
    })
    .catch(e => {
      console.error(e.stack);
      return false;
    });
};

exports.loginUser = async function(user) {
  let users = [];

  const text = `SELECT * FROM app_user WHERE username = $1`;
  const values = [user.username];

  return await pool
    .query(text, values)
    .then(res => {
      if (res.rows.length === 0) {
        return false;
      } else {
        // console.log(encryptionHelper.comparePassword(user.password, res.rows[0].Password));
        return encryptionHelper.comparePassword(
          user.password,
          res.rows[0].Password
        );
      }
    })
    .catch(e => {
      console.error(e.stack);
      return null;
    });
};

// module.exports = UserDao;
