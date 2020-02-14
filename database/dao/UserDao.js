let encryptionHelper = require('../../utilities/encryptionHelper.js');
let User = require('../models/AppUser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const { Client } = require('pg');
const pool = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'ProdDb',
  password: process.env.DB_PASSWORD,
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
  console.log(user);

  const getUserQuery = `SELECT * FROM app_user WHERE username = $1 OR email = $2`;
  const userValues = [user.username.toLowerCase(), user.email.toLowerCase()];

  await pool.query(getUserQuery, userValues).then(res => {
    if (res.rows.length > 0) {
      console.log('User already exists');
      throw new Error('User already exists');
    }
  });

  // // Generate salt to be stored in the DB
  bcrypt.hash(user.password, 15, async function(err, hash) {
    const text = `INSERT INTO app_user (username, password, email, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING * `;
    const values = [
      user.username.toLowerCase(),
      hash,
      user.email.toLowerCase(),
      user.first_name,
      user.last_name
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
        // // console.log(encryptionHelper.comparePassword(user.password, res.rows[0].Password));
        // return encryptionHelper.comparePassword(
        //   user.password,
        //   res.rows[0].Password
        // );

        // bcrypt.compare(user.password, res.rows[0].Password, function(
        //   err,
        //   result
        // ) {
        //   console.log('User logged in!');
        // });

        bcrypt
          .compare(user.password, res.rows[0].password)
          .then(function(result) {
            console.log(result);
          });
      }
    })
    .catch(e => {
      console.error(e.stack);
      return null;
    });
};
