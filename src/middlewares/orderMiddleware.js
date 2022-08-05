const { validateOrderFields } = require('../schemas/yupOrderSchema');
const kenex = require('../config/knexConnection');
const { NotFoundError } = require('../utils/apiErros');

const validateBodyRegister = async (req, res, next) => {
	const { cliente_id, pedido_produtos } = req.body;

	await validateOrderFields.validate({cliente_id, pedido_produtos});
  
	for (const pedido of pedido_produtos) {
		const product = await kenex('produtos').where({id: pedido.produto_id}).first();
		
		if (!product) {
			throw new NotFoundError(`produto_id ${pedido.produto_id} não existe`);
		}
	}

	next();
};

module.exports = {
	validateBodyRegister
};