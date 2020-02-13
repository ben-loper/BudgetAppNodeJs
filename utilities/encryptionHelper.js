const bcrypt = require('bcrypt');

exports.generateSalt = async function() {
  return await bcrypt.genSalt();
};

exports.generateHash = async function(password, salt) {
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};
