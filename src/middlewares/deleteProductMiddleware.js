/* eslint-disable indent */
const knex = require('../config/knexConnection');
const { NotFoundError } = require('../utils/apiErros');

const validateProductOrder = async (req, res, next) => {

    const { id } = req.params;

    const produto_id = await knex('pedido_produtos').where({ produto_id: id }).first();

    if (produto_id) {
        throw new NotFoundError('Esse produto não pode ser deletado, pois está sendo usado em um pedido.');
    }

    next();
};

module.exports = {
    validateProductOrder
};