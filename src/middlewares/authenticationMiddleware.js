const knex = require('../config/knexConnection');
const validateAuthenticationFields = require('../schemas/yupAuthenticationSchema');
const { BadRequestError } = require('../utils/apiErros');
const { isCorrectPassword } = require('../utils/bcrypt');

const validateBodyAuthentication = async (req, res, next) => {
	const { email, senha } = req.body;

	await validateAuthenticationFields.validate({ email, senha });

	const user = await knex('usuarios').where({ email }).first();

	if (!user) {
		throw new BadRequestError('Email e/ou senha inválido(s).');
	}

	const correctPassword = await isCorrectPassword(senha, user.senha);

	if (!correctPassword) {
		throw new BadRequestError('Email e/ou senha inválido(s).');
	}

	req.user = { id: user.id, nome: user.nome, email: user.email };

	next();
};

module.exports = {
	validateBodyAuthentication
};