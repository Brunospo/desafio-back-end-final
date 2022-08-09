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

const listOrders = async (req, res) => {
	const { cliente_id } = req.query;

	const query = knex('pedidos').join('pedido_produtos', 'pedidos.id', '=', 'pedido_produtos.pedido_id');
	const result = [];

	if (cliente_id) {
		query.where('pedidos.cliente_id', cliente_id);
	}

	const order = await query;

	order.forEach((element) => {

		const currentOrderProductElement = {id: element.id, quantidade_produto: element.quantidade_produto, valor_produto: element.valor_produto, pedido_id: element.pedido_id, produto_id: element.produto_id};
		
		const currentOrderElement = {pedido: {id: element.pedido_id, valor_total: element.valor_total, observacao: element.observacao, cliente_id: element.cliente_id}, pedido_produtos:[currentOrderProductElement]};
	
		if (result.length === 0) {
			result.push(currentOrderElement);
			return;
		}

		const registeredElement = result.find(elementF => elementF.pedido.id === element.pedido_id);

		if (!registeredElement) {
			result.push(currentOrderElement);
			return;
		} else {
			registeredElement.pedido_produtos.push(currentOrderProductElement);
		}
	});

	return res.json(result);
};

module.exports = {
	registerOrder,
	listOrders
};