const bcrypt = require('bcrypt');

const encryptPassword = (password) => bcrypt.hash(password, 10);
const isCorrectPassword = (password, encryptedPassword) => bcrypt.compare(password, encryptedPassword);

module.exports = {
	encryptPassword,
	isCorrectPassword
};