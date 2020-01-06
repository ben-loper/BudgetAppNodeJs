document.addEventListener('DOMContentLoaded', function() {
	let sbmtBtn = document.getElementById('register-sbm-btn');

	let passwordField = document.getElementById('password');
	let confPassField = document.getElementById('confirm-password');
	let warningLbl = document.getElementById('password-same-warning-lbl');

	confPassField.addEventListener('input', displayMessage);

	passwordField.addEventListener('input', displayMessage);

	sbmtBtn.addEventListener('click', function(event) {
		event.preventDefault();

		let password = document.getElementById('password').innerText;
		let confirmPassword = document.getElementById('confirm-password').innerText;

		if (password === confirmPassword) {
			let user = {};

			user.firstName = document.getElementById('first-name').value;
			user.lastName = document.getElementById('last-name').value;
			user.email = document.getElementById('email').value;
			user.password = document.getElementById('password').value;
			user.username = document.getElementById('username').value;

			registerUser(user);
		}
	});

	function displayMessage() {
		let password = passwordField.value;
		let confPassword = confPassField.value;

		if (password !== confPassword || (password === '' && confPassword === '')) {
			if (sbmtBtn.classList.contains('btn-primary')) {
				sbmtBtn.disabled = true;
				sbmtBtn.classList.remove('btn-primary');
				sbmtBtn.classList.add('btn-disabled');
			}
			warningLbl.style.removeProperty('display');
		} else {
			sbmtBtn.disabled = false;
			sbmtBtn.classList.remove('btn-disabled');
			sbmtBtn.classList.add('btn-primary');
			warningLbl.style.setProperty('display', 'none');
		}
	}
});

async function registerUser(user) {
	const response = await fetch('/register', {
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
