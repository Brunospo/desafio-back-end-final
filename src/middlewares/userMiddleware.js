const knex = require('../config/knexConnection');
const { isCorrectPassword } = require('../utils/bcrypt');

const { validateUserFields, validateEditPasswordFields } = require('../schemas/yupUserSchema');

const validateBodyRegister = async (req, res, next) => {
	const { email } = req.body;

	try {
		await validateUserFields.validate({ ...req.body });

		const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();

		if (existisEmail) {
			return res.status(400).json({ message: 'Email já cadastrado' });
		}
	} catch (error) {
		if (error.name === 'ValidationError'){
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: error.message });
	}

	next();
};

const validateBodyEditPassword = async (req, res, next) => {
	const { email, senha_antiga } = req.body;

	try {
		await validateEditPasswordFields.validate({ ...req.body });

		const user = await knex.select('email', 'senha').from('usuarios').where({ email }).first();

		if (!user) {
			return res.status(400).json({ message: 'Email e/ou senha inválido(s).' });
		}

		const correctOldPassword = await isCorrectPassword(senha_antiga, user.senha);

		if (!correctOldPassword) {
			return res.status(400).json({ message: 'Email e/ou senha inválido(s).' });
		}

	} catch (error) {
		if (error.name === 'ValidationError'){
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: error.message });
	}

	next();
};

const validateBodyUpdate = async (req, res, next) => {
	const { email } = req.body;
	const { email: oldEmail} = req.usuario;

	try {
		await validateUserFields.validate({ ...req.body });

		if (email !== oldEmail) {
			const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();

			if (existisEmail) {
				return res.status(400).json({ message: 'Email já cadastrado' });
			}
		}
	} catch (error) {
		if (error.name === 'ValidationError'){
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: error.message });
	}

	next();
};

module.exports = {
	validateBodyRegister,
	validateBodyEditPassword,
	validateBodyUpdate
};