const knex = require('../config/knexConnection');

const registerOrder = async (req, res) => {
	const { cliente_id, observacao, pedido_produtos } = req.body;
	const { productData, totalValue } = req.productData;
	
	await knex.transaction(async trx => {
		
		const [ order ] = await trx('pedidos')
			.insert({cliente_id, observacao, valor_total: totalValue}).returning('*');

		for (const [ index, solicitation ] of pedido_produtos.entries()) {
			solicitation.pedido_id = order.id;
			solicitation.valor_produto = productData[index].value;

			await trx('produtos').update({quantidade_estoque: (productData[index].stock - solicitation.quantidade_produto)}).where({id: solicitation.produto_id});
		}

		await trx('pedido_produtos').insert(pedido_produtos);

		const orderData = pedido_produtos.map((value, index) => {
			return {
				descricao: productData[index].description,
				quantidade: value.quantidade_produto, 
				valor: value.valor_produto 
			};
		}); 

		const {valor_total, ...rest} = order;
    
		return res.status(201).json({pedido: {...rest, produtos: [...orderData], valor_total}});
	});
};

module.exports = {
	registerOrder
};