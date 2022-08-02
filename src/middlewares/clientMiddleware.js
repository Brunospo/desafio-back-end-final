const knex = require('../config/knexConnection');
const { validateClientFields, validateIdtype } = require('../schemas/yupClientSchema');

const validateBodyClient = async (req, res, next) => {

	const { email, cpf } = req.body;

	try {
		await validateClientFields.validate({ ...req.body });

		const existisEmail = await knex.select('email').from('clientes').where({ email }).first();
		const existisCPF = await knex.select('cpf').from('clientes').where({ cpf }).first();

		if (existisEmail) {
			return res.status(400).json({ message: 'Email já cadastrado' });
		}

		if (existisCPF) {
			return res.status(400).json({ message: 'CPF já cadastrado' });
		}


	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: error.message });
	}

	next();
};

const validateId = async (req, res, next) => {
	const { id } = req.params;

	try {
		await validateIdtype.validate({id});

		const existsClient = await knex('clientes').where({id}).first();
        
		if (!existsClient) {
			return res.status(404).json({message: 'Esse cliente não existe'});
		}

		req.client = existsClient;

	} catch (error) {

		if (error.name === 'ValidationError'){
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: error.message });
	}

	next();
};

const validateUpdateBody = async (req, res, next) => {
	const { email, cpf } = req.body;
	const { email: oldEmail, cpf: oldCPF } = req.client;

	try {
		await validateClientFields.validate({ ...req.body });

		if (email !== oldEmail) {
			const existisEmail = await knex.select('email').from('clientes').where({ email }).first();

			if (existisEmail) {
				return res.status(400).json({ message: 'Email já cadastrado' });
			}
		}

		if (cpf !== oldCPF) {
			const existisCPF = await knex.select('cpf').from('clientes').where({ cpf }).first();

			if (existisCPF) {
				return res.status(400).json({ message: 'CPF já cadastrado' });
			}
		}
	} catch (error) {

		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({ message: error.message });
	}

	next();
};

module.exports = {
	validateBodyClient,
	validateUpdateBody,
	validateId
};
