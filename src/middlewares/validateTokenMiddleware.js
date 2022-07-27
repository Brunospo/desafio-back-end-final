/* eslint-disable no-undef */
/* eslint-disable indent */

const jwt = require('jsonwebtoken');
const knex = require('../config/knexConnection');

const validateLoggedUser = async (req, res, next) => {

    const { authorization } = await req.headers;

    if (!authorization) {
        return await res.status(401).json('Não autorizado');
    }

    try {
        const token = await authorization.replace('Bearer ', '').trim();

        const { id } = await jwt.verify(token, process.env.JWT_SECUREPASSWORD);

        const usuarioLogado = await knex('usuarios').where({ id }).first();

        if (!usuarioLogado) {
            return await res.status(404).json('Usuario não encontrado');
        }

        req.usuario = await usuarioLogado;

        next();
    } catch (error) {
        return await res.status(400).json(error.message);
    }
};

module.exports = {
    validateLoggedUser
};