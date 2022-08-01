/* eslint-disable indent */
const knex = require('../config/knexConnection');

const registerClient = async (req, res) => {

    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const [client] = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning([
            'id',
            'nome',
            'email',
            'cpf',
            'cep',
            'rua',
            'numero',
            'bairro',
            'cidade',
            'estado'
        ]);

        return res.status(201).json({ Cliente: client });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateClient = async (req, res) => {

    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;

    try {
        const [client] = await knex('clientes').update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).where({ id }).returning(['*']);

        return res.status(200).json({ Cliente: client });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const listClient = async (req, res) => {

    try {
        const clients = await knex('clientes').select('*');

        return res.status(200).json({ Clientes: clients });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const detailClient = async (req, res) => {

    const { id } = req.params;

    try {
        const client = await knex('clientes').select('*').where({ id }).first();

        if (!client) {
            return res.status(400).json({ message: 'Cliente não encontrado' });
        }

        return res.status(200).json({ Cliente: client });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerClient,
    updateClient,
    listClient,
    detailClient
};