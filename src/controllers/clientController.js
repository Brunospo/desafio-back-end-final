const knex = require('../config/knexConnection');

const registerClient = async (req, res) => {

	const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

	try {
		const [client] = await knex('clientes')
			.insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
			.returning('*');

		const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));

		return res.status(201).json({ cliente: clientRemovedNullKeys });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateClient = async (req, res) => {

	const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
	const { id } = req.params;

	try {
		const [client] = await knex('clientes')
			.update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
			.where({ id }).returning('*');

		const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));

		return res.json({ cliente: clientRemovedNullKeys });

	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const listClient = async (req, res) => {

	try {
		const clients = await knex('clientes');

		return res.json({ clientes: clients });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
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