const knex = require('../config/knexConnection');

const registerProduct = async (req, res) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	try {
		const [ product ] = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');
		
		return res.json({produto: product});
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

const editProduct = async (req, res) => {
	const { id } = req.params;
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	try {
		const updatedProduct = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id }).where({id}).returning('*');
		
		return res.json({produto: updatedProduct});		
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

module.exports = {
	registerProduct,
	editProduct
};