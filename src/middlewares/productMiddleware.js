const { validateRegisterFields, validateIdtype } = require('../schemas/yupProductSchema');
const knex = require('../config/knexConnection');
const { NotFoundError } = require('../utils/apiErros');

const validateBodyFields = async (req, res, next) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	await validateRegisterFields.validate({ descricao, quantidade_estoque, valor, categoria_id });

	const existsCategory = await knex('categorias').where({id: categoria_id}).first();
	if (!existsCategory) {
		throw new NotFoundError('Essa categoria não existe.');
	}

	next();
};

const validateProductId = async (req, res, next) => {
	const { id } = req.params;

	await validateIdtype.validate({id});

	const existsProduct = await knex('produtos').where({id}).first();
		
	if (!existsProduct) {
		throw new NotFoundError('Esse produto não existe');
	}

	next();
};

module.exports = {
	validateBodyFields,
	validateProductId
};