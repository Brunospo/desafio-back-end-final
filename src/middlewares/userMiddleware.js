const validateUserFields = require('../schemas/yupUserSchema');
const knex = require('../config/knexConnection');

const validateBodyRegister = async (req, res, next) => {
	const { email } = req.body;

	try {
		await validateUserFields.validate({...req.body});

		const [ hasEmail ] = await knex('usuarios').where({email});

		if (hasEmail) {
			return res.status(400).json({message: 'Email já cadastrado'});
		}
	} catch (error) {
		return res.status(500).json({message: error.message});
	}

	next();
};

module.exports = {
	validateBodyRegister
};