const knex = require('../config/knexConnection');

const registerProduct = async (req, res) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	const [ product ] = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');
		
	return res.json({produto: product});
};

const editProduct = async (req, res) => {
	const { id } = req.params;
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

	const [ updatedProduct ] = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id }).where({id}).returning('*');
		
	return res.json({produto: updatedProduct});		
};

const listProduct = async (req, res) => {
	const { categoria_id } = req.query;

	const querryListProduct = knex('produtos');

	if (categoria_id) {			
		querryListProduct.where({categoria_id});
	}

	const product = await querryListProduct;
		
	return res.json({produtos: product});
};

const detailProduct = async (req, res) => {
	const { id } = req.params;	

	const product = await knex('produtos').where({id}).first();

	return res.json({produto: product});
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;	

	await knex('produtos').del().where({id});

	return res.json({message: 'Produto deletado com sucesso'});
};

module.exports = {
	registerProduct,
	editProduct,
	listProduct,
	detailProduct,
	deleteProduct
};