/* eslint-disable */

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
	const user = req.user;
	
	try {
		const token = jwt.sign(user, process.env.JWT_SECUREPASSWORD, { expiresIn: '2h' });

    return res.json({usuario: {...user}, token})

	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

module.exports = {
	loginUser
};