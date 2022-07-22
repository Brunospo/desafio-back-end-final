const knex = require('../config/knexConnection');
const validateAuthenticationFields = require('../schemas/yupAuthenticationSchema');
const { isCorrectPassword } = require('../utils/bcrypt');

const validateBodyAuthentication = async (req, res, next) => {
	const { email, senha } = req.body;

	try {
		await validateAuthenticationFields.validate({email, senha});

		const user = await knex('usuarios').where({email}).first();
		
		if (!user) {
			return res.status(400).json({message: 'Email e/ou senha inválido(s).'});
		}

		const correctPassword = await isCorrectPassword(senha, user.senha);
		
		if (!correctPassword) {
			return res.status(400).json({message: 'Email e/ou senha inválido(s).'});
		}

		req.user = {id: user.id, nome: user.nome, email: user.email};

	} catch (error) {
		return res.status(500).json({message: error.message});
	}

	next();
};

module.exports = {
	validateBodyAuthentication
};