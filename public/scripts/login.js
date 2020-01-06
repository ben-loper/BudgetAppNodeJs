document.addEventListener('DOMContentLoaded', function() {
	let sbmtBtn = document.getElementById('login-sbmt-btn');

	let passwordField = document.getElementById('password');

	sbmtBtn.addEventListener('click', async function(event) {
		event.preventDefault();

		let password = document.getElementById('password').value;
		let username = document.getElementById('username').value;

		let user = {};
		user.username = username;
		user.password = password;
		let response = await login(user);

		if (response.status === 200) {
			window.location.href = '/success';
		}
	});
});

async function login(user) {
	return await fetch('/login', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(user)
	});
}
