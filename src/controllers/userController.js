const { encryptPassword } = require('../utils/bcrypt');
const knex = require('../config/knexConnection');

const registerUser = async (req, res) => {
	const { nome, email, senha } = req.body;

	try {
		const encryptedPassword = await encryptPassword(senha);

		const [ user ] = await knex('usuarios').insert({nome, email, senha: encryptedPassword}).returning(['id', 'nome', 'email']);
		
		return res.status(201).json({usuario: user});
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

module.exports = {
	registerUser
};