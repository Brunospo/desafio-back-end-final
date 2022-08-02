const knex = require('../config/knexConnection');

const listCategories = async (req, res) => {
	const result = await knex('categorias');

	return res.json({categorias: result});
};

module.exports = {
	listCategories
};