/* eslint-disable indent */
const yup = require('../config/yup');

const validateImageBody = yup.object().shape({
    imagem: yup.string().required('url_produto é um campo obrigatório')
});

module.exports = {
    validateImageBody
};