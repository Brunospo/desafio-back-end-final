/* eslint-disable indent */
const { validateImageBody } = require('../schemas/yupImageSchema');
const { BadRequestError } = require('../utils/apiErros');
const isBase64 = require('is-base64');

const validateImage = async (req, res, next) => {

    const { imagem } = req.body;

    await validateImageBody.validate({ imagem });

    if (!isBase64(imagem)) {
        throw new BadRequestError('imagem deve está no formato base64');
    }

    next();

};

module.exports = {
    validateImage
};