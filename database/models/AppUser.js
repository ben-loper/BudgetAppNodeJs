function AppUser() {}

AppUser.prototype.getId = function() {
	return this.id;
};

AppUser.prototype.setId = function(id) {
	this.id = id;
};

AppUser.prototype.getUsername = function() {
	return this.username;
};

AppUser.prototype.setUsername = function(username) {
	this.username = username;
};

AppUser.prototype.getPassword = function() {
	return this.password;
};

AppUser.prototype.setPassword = function(password) {
	this.password = password;
};

AppUser.prototype.getEmail = function() {
	return this.email;
};

AppUser.prototype.setEmail = function(email) {
	this.email = email;
};

AppUser.prototype.getIsActive = function() {
	return this.isActive;
};

AppUser.prototype.setIsActive = function(isActive) {
	this.isActive = isActive;
};

module.exports = AppUser;
