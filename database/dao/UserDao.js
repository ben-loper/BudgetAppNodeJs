function UserDao() {}

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

UserDao.prototype.getAllUsers = async function() {
	let users = [];

	await pool
		.query('SELECT * FROM "AppUser"')
		.then((res) => {
			if (res.rows.length > 0) {
				res.rows.forEach((record) => {
					let user = new User();

					user.setId(record.Id);
					user.setEmail(record.Email);
					user.setPassword(record.Password);
					user.setIsActive(record.Active);

					users.push(user);
				});
			}
		})
		.catch((e) => console.log(e.stack));

	return users;
};

UserDao.prototype.registerNewUser = async function(user) {
	let users = [];
	// Generate salt to be stored in the DB
	let salt = await encryptionHelper.prototype.generateSalt();
	let hash = await encryptionHelper.prototype.generateHash(user.password, salt);

	const text = `INSERT INTO "AppUser" ("Username", "Password", "Email", "FirstName", "LastName", "Salt") VALUES($1, $2, $3, $4, $5, $6) RETURNING * `;
	const values = [ user.username.toLowerCase(), hash, user.email.toLowerCase(), user.firstName, user.lastName, salt ];

	await pool
		.query(text, values)
		.then((res) => {
			return true;
		})
		.catch((e) => {
			console.error(e.stack);
			return false;
		});
};

UserDao.prototype.loginUser = async function(user) {
	let users = [];

	const text = `SELECT * FROM "AppUser" WHERE "Username" = $1`;
	const values = [ user.username ];

	return await pool
		.query(text, values)
		.then((res) => {
			if (res.rows.length === 0) {
				return false;
			} else {
				// console.log(encryptionHelper.prototype.comparePassword(user.password, res.rows[0].Password));
				return encryptionHelper.prototype.comparePassword(user.password, res.rows[0].Password);
			}
		})
		.catch((e) => {
			console.error(e.stack);
			return null;
		});
};

module.exports = UserDao;
