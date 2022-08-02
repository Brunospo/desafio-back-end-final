const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
	const user = req.user;

	const token = jwt.sign(user, process.env.JWT_SECUREPASSWORD, { expiresIn: '2h' }); //eslint-disable-line

	return res.json({ usuario: { ...user }, token });
};

module.exports = {
	loginUser
};