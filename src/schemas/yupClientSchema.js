/* eslint-disable indent */
const yup = require('../config/yup');

const validateClientFields = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email('Formato de email inválido').required(),
    cpf: yup.string().required().length(11),
    cep: yup.string().length(8),
    rua: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string().length(2)
});

module.exports = {
    validateClientFields
};