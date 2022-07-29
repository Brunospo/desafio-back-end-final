const { validateRegisterFields } = require('../schemas/yupProductSchema');
const knex = require('../config/knexConnection');

const validateBodyRegister = async (req, res, next) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	try {
		await validateRegisterFields.validate({ descricao, quantidade_estoque, valor, categoria_id });

		const existsCategory = await knex('categorias').where({id: categoria_id}).first();
		if (!existsCategory) {
			return res.status(404).json({message: 'Essa categoria não existe.'});
		}

	} catch (error) {

		if (error.name === 'ValidationError'){
			return res.status(400).json({ message: error.message });
		}

		return res.status(500).json({message: error.message});
	}

	next();
};

module.exports = {
	validateBodyRegister
};