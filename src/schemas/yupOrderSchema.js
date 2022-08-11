const yup = require('../config/yup');

const validateOrderFields = yup.object().shape({
	cliente_id: yup.number().integer('cliente_id deve receber um número inteiro').positive().required(),
	observacao: yup.string(),
	pedido_produtos: yup.array().of(yup.object().shape({
		produto_id: yup.number().positive().integer().required(),
		quantidade_produto: yup.number().positive().integer().required()
	})).min(1, 'pedido_produtos deve ter pelo menos 1 item').required()
});

const validateQueryId = yup.object().shape({
	cliente_id: yup.number().integer('cliente_id deve receber um número inteiro').positive()
});

module.exports = {
	validateOrderFields,
	validateQueryId
};