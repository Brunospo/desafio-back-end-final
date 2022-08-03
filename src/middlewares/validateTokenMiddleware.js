const jwt = require('jsonwebtoken');
const knex = require('../config/knexConnection');
const { UnauthorizedError, NotFoundError } = require('../utils/apiErros');

const validateToken = async (req, res, next) => {

	const { authorization } = req.headers;

	if (!authorization) {
		throw new UnauthorizedError('Para acessar este recurso um token de autenticação válido deve ser enviado.');
	}

	const token = authorization.replace('Bearer ', '').trim();

	const { id } = jwt.verify(token, process.env.JWT_SECUREPASSWORD); //eslint-disable-line

	const user = await knex.select('id', 'nome', 'email').from('usuarios').where({ id }).first();

	if (!user) {
		throw new NotFoundError('Usuario não encontrado');
	}

	req.usuario = user;

	next();
};

module.exports = {
	validateToken
};