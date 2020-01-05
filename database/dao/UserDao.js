function UserDao() {}

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

module.exports = UserDao;
