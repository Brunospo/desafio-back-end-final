const { validateUserFields, validateEditPassword } = require('../schemas/yupUserSchema');
const knex = require('../config/knexConnection');
const { isCorrectPassword } = require('../utils/bcrypt');

const validateBodyRegister = async (req, res, next) => {
	const { email } = req.body;

	try {
		await validateUserFields.validate({ ...req.body });

		const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();

		if (existisEmail) {
			return res.status(400).json({ message: 'Email já cadastrado' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	next();
};

const validateBodyEditPassword = async (req, res, next) => {
	const { email, senha_antiga, senha_nova } = req.body;

	try {
		await validateEditPassword.validate({ ...req.body });

		const user = await knex.select('email', 'senha').from('usuarios').where({ email }).first();

		if (!user) {
			return res.status(400).json({ message: 'Email não cadastrado' });
		}

		const verifyOldPassword = await isCorrectPassword(senha_antiga, user.senha);

		if (verifyOldPassword === false) {
			return res.status(400).json({ message: 'Senha antiga incorreta' });
		}

		const verifyNewPassword = await isCorrectPassword(senha_nova, user.senha);

		if (verifyNewPassword === true) {
			return res.status(400).json({ message: 'A nova senha deve ser diferente da senha antiga' });
		}

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	next();
};

module.exports = {
	validateBodyRegister,
	validateBodyEditPassword
};