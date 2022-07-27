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
		return res.status(500).json({ message: error.message });
	}

	next();
};

const validateBodyEditPassword = async (req, res, next) => {
	const { email, senha_antiga, senha_nova } = req.body;

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

		if (correctOldPassword && (senha_antiga === senha_nova)) {
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