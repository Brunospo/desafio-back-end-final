const knex = require('../config/knexConnection');
const { validateClientFields, validateIdtype } = require('../schemas/yupClientSchema');
const { BadRequestError, NotFoundError } = require('../utils/apiErros');

const validateBodyClient = async (req, res, next) => {

	const { email, cpf } = req.body;

	await validateClientFields.validate({ ...req.body });

	const existisEmail = await knex.select('email').from('clientes').where({ email }).first();
	const existisCPF = await knex.select('cpf').from('clientes').where({ cpf }).first();

	if (existisEmail) {
		throw new BadRequestError('Email já cadastrado');
	}

	if (existisCPF) {
		throw new BadRequestError('CPF já cadastrado');
	}

	next();
};

const validateId = async (req, res, next) => {
	const { id } = req.params;

	await validateIdtype.validate({id});

	const existsClient = await knex('clientes').where({id}).first();
        
	if (!existsClient) {
		throw new NotFoundError('Esse cliente não existe');
	}

	req.client = existsClient;

	next();
};

const validateUpdateBody = async (req, res, next) => {
	const { email, cpf } = req.body;
	const { email: oldEmail, cpf: oldCPF } = req.client;

	await validateClientFields.validate({ ...req.body });

	if (email !== oldEmail) {
		const existisEmail = await knex.select('email').from('clientes').where({ email }).first();

		if (existisEmail) {
			throw new BadRequestError('Email já cadastrado');
		}
	}

	if (cpf !== oldCPF) {
		const existisCPF = await knex.select('cpf').from('clientes').where({ cpf }).first();

		if (existisCPF) {
			throw new BadRequestError('CPF já cadastrado');
		}
	}

	next();
};

module.exports = {
	validateBodyClient,
	validateUpdateBody,
	validateId
};
