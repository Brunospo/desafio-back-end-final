const knex = require('../config/knexConnection');

const registerOrder = async (req, res) => {
	const { cliente_id, observacao, pedido_produtos } = req.body;
	const productData = req.productData;
	
	await knex.transaction(async trx => {
		
		const [ { id } ] = await trx('pedidos')
			.insert({cliente_id, observacao}).returning('id');

		for (const [ index, order ] of pedido_produtos.entries()) {
			order.pedido_id = id;
			order.valor_produto = productData[index].value;

			await trx('produtos').update({quantidade_estoque: (productData[index].stock - order.quantidade_produto)}).where({id: order.produto_id});
		}

		const productsOrder = await trx('pedido_produtos').insert(pedido_produtos).returning(['quantidade_produto', 'valor_produto']);
		
		const totalValue = productsOrder.reduce((sum, order) => sum + (order.quantidade_produto * order.valor_produto), 0);

		const orderResult = await trx('pedidos').update({valor_total: totalValue}).where({id}).returning('*');

		const orderData = pedido_produtos.map((value, index) => {
			return {
				descricao: productData[index].description,
				quantidade: value.quantidade_produto, 
				valor: value.valor_produto 
			};
		});

		const {valor_total, ...rest} = orderResult[0];

		const result = {...rest, produtos: [...orderData], valor_total};
    
		return res.status(201).json({pedido: result});
	});
};
module.exports = {
	registerOrder
};