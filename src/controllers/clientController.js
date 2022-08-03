const knex = require('../config/knexConnection');

const registerClient = async (req, res) => {

	const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

	const [client] = await knex('clientes')
		.insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
		.returning('*');

	const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));

	return res.status(201).json({ cliente: clientRemovedNullKeys });
};

const updateClient = async (req, res) => {

	const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
	const { id } = req.params;

	const [client] = await knex('clientes')
		.update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
		.where({ id }).returning('*');

	const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));

	return res.json({ cliente: clientRemovedNullKeys });
};

const listClient = async (req, res) => {
	
	const clients = await knex('clientes');

	return res.json({ clientes: clients });
};

const detailClient = async (req, res) => {
	return res.json({cliente: req.client});
};

module.exports = {
	registerClient,
	updateClient,
	listClient,
	detailClient
};