const knex = require('../config/knexConnection');
const { isCorrectPassword } = require('../utils/bcrypt');
const { BadRequestError } = require('../utils/apiErros');

const { validateUserFields, validateEditPasswordFields } = require('../schemas/yupUserSchema');

const validateBodyRegister = async (req, res, next) => {
	const { email } = req.body;

	await validateUserFields.validate({ ...req.body });

	const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();

	if (existisEmail) {
		throw new BadRequestError('Email já cadastrado');
	}

	next();
};

const validateBodyEditPassword = async (req, res, next) => {
	const { email, senha_antiga, senha_nova } = req.body;

	await validateEditPasswordFields.validate({ ...req.body });

	const user = await knex.select('email', 'senha').from('usuarios').where({ email }).first();

	if (!user) {
		throw new BadRequestError('Email e/ou senha inválido(s).');
	}

	const correctOldPassword = await isCorrectPassword(senha_antiga, user.senha);

	if (!correctOldPassword) {
		throw new BadRequestError('Email e/ou senha inválido(s).');
	}

	if (correctOldPassword && (senha_antiga === senha_nova)) {
		throw new BadRequestError('A nova senha deve ser diferente da senha antiga.');
	}

	next();
};

const validateBodyUpdate = async (req, res, next) => {
	const { email } = req.body;
	const { email: oldEmail } = req.usuario;

	await validateUserFields.validate({ ...req.body });

	if (email !== oldEmail) {
		const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();

		if (existisEmail) {
			throw new BadRequestError('Email já cadastrado');
		}
	}

	next();
};

module.exports = {
	validateBodyRegister,
	validateBodyEditPassword,
	validateBodyUpdate
};