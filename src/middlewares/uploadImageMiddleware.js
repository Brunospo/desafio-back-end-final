/* eslint-disable indent */
const { validateImageBody } = require('../schemas/yupImageSchema');
const { BadRequestError } = require('../utils/apiErros');
const isBase64 = require('is-base64');

const validateImage = async (req, res, next) => {

    const { url_produto, nome } = req.body;

    await validateImageBody.validate({ url_produto, nome });

    if (!isBase64(url_produto)) {
        throw new BadRequestError('url_produto deve está no formato base64');
    }

    next();

};

module.exports = {
    validateImage
};