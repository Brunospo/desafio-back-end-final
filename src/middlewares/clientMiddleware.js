/* eslint-disable indent */
const knex = require('../config/knexConnection');
const { validateClientFields } = require('../schemas/yupClientSchema');

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

const validateClientID = async (req, res, next) => {
    const { id } = req.params;
    const { email, cpf } = req.body;

    try {

        if (id) {
            const client = await knex.select('*').from('clientes').where({ id }).first();
            req.cliente = client;

            if (!client) {
                return res.status(400).json({ message: 'Cliente não encontrado' });
            }
        }

        const { email: oldEmail, cpf: oldCPF } = req.cliente;

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
        return res.status(500).json({ message: error.message });
    }

    next();
};

module.exports = {
    validateBodyClient,
    validateClientID
};
