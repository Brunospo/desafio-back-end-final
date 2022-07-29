const knex = require('../config/knexConnection');

const registerProduct = async (req, res) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	try {
		const [ produto ] = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');
		
		return res.json({produto});
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

module.exports = {
	registerProduct
};