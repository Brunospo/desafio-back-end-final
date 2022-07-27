const jwt = require('jsonwebtoken');
const knex = require('../config/knexConnection');

const validateToken = async (req, res, next) => {

	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({message: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'});
	}

	try {
		const token = authorization.replace('Bearer ', '').trim();

		const { id } = jwt.verify(token, process.env.JWT_SECUREPASSWORD); //eslint-disable-line

		const user = await knex.select('id', 'nome', 'email').from('usuarios').where({ id }).first();

		if (!user) {
			return await res.status(404).json({message: 'Usuario não encontrado'});
		}

		req.usuario = user;

		next();
	} catch (error) {
		return await res.status(500).json({message: error.message});
	}
};

module.exports = {
	validateToken
};