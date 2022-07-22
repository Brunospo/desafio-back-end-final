const knex = require('../config/knexConnection');

const listCategories = async (req, res) => {
	try {
		const result = await knex('categorias');

		return res.json({categorias: result});

	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

module.exports = {
	listCategories
};