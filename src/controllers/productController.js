const knex = require('../config/knexConnection');
const { validateIdtype } = require('../schemas/yupProductSchema');
const { NotFoundError } = require('../utils/apiErros');

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
	const { categoria_id: id } = req.query;

	const querryListProduct = knex('produtos');

	if (id) {
		await validateIdtype.validate({id});
			
		querryListProduct.where({id}).first();
	}

	const product = await querryListProduct;

	if (!product) {
		throw new NotFoundError('Esse produto não existe');
	}
		
	return res.json({'produto(s)': product});
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