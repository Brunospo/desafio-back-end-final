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
		const [ updatedProduct ] = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id }).where({id}).returning('*');
		
		return res.json({produto: updatedProduct});		
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

const listProduct = async (req, res) => {
	const { categoria_id } = req.query;

	try {
		const querryListProduct = knex('produtos');

		if (categoria_id) {
			querryListProduct.where({id: categoria_id}).first();
		}

		const product = await querryListProduct;

		if (!product) {
			return res.status(404).json({message: 'Esse produto não existe'});
		}
		
		return res.json({'produto(s)': product});

	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

const detailProduct = async (req, res) => {
	const { id } = req.params;	

	try {
		const product = await knex('produtos').where({id}).first();

		return res.json({produto: product});

	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;	

	try {
		await knex('produtos').del().where({id});

		return res.json({message: 'Produto deletado com sucesso'});

	} catch (error) {
		return res.status(500).json({message: error.message});
	}
};

module.exports = {
	registerProduct,
	editProduct,
	listProduct,
	detailProduct,
	deleteProduct
};