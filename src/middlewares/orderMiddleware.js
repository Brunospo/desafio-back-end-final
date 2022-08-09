const { validateOrderFields, validateQueryId } = require('../schemas/yupOrderSchema');
const knex = require('../config/knexConnection');
const { NotFoundError, BadRequestError } = require('../utils/apiErros');

const validateBodyRegister = async (req, res, next) => {
	const { cliente_id, pedido_produtos } = req.body;
	const productData = [];
	let totalValue = 0;

	await validateOrderFields.validate({cliente_id, pedido_produtos});

	const existsClient = await knex('clientes').where({id: cliente_id}).first();
	
	if (!existsClient) {
		throw new NotFoundError('Não existe cliente para o cliente_id informado');
	}
  
	for (const [index, order] of pedido_produtos.entries()) {
		const product = await knex.select('quantidade_estoque', 'valor', 'descricao').from('produtos').where({id: order.produto_id}).first();
		
		if (!product) {
			throw new NotFoundError(`Problema no produto ${index + 1}: Não existe produto cadastrado para o produto_id informado`);
		}

		if (order.quantidade_produto > product.quantidade_estoque) {
			throw new BadRequestError(`Problema no produto ${index + 1}: quantidade_produto é maior que a quantidade em estoque`);
		}
		
		totalValue += (order.quantidade_produto * product.valor);
		productData.push({value: product.valor, description: product.descricao, stock: product.quantidade_estoque});
	}

	req.productData = {productData, totalValue};

	next();
};

const validateQueryParam = async (req, res, next) => {
	const { cliente_id } = req.query;

	if (cliente_id) {
		await validateQueryId.validate({cliente_id});

		const existsClient = await knex('clientes').where({id: cliente_id}).first();
		
		if (!existsClient) {
			throw new NotFoundError('Não existe cliente para o cliente_id informado');
		}
	}

	next();
};

module.exports = {
	validateBodyRegister,
	validateQueryParam
};