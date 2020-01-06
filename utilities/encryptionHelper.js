const bcrypt = require('bcrypt');

function EncryptionHelper() {}

EncryptionHelper.prototype.generateSalt = async function() {
	return await bcrypt.genSalt();
};

EncryptionHelper.prototype.generateHash = async function(password, salt) {
	return await bcrypt.hash(password, salt);
};

EncryptionHelper.prototype.comparePassword = function(password, hash) {
	return bcrypt.compareSync(password, hash);
};

module.exports = EncryptionHelper;
