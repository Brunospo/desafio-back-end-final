/* eslint-disable indent */
const yup = require('../config/yup');

const validateClientFields = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email('Formato de email inválido').required(),
    cpf: yup.string().required().length(11).matches(/\d{11}/g, 'O CPF deve ser composto apenas de números'),
    cep: yup.string().length(8).matches(/\d{8}/g, 'O CEP deve ser composto apenas de números'),
    rua: yup.string(),
    numero: yup.number().integer('O numero deve ser um inteiro').positive(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string().length(2).matches(/[A-Za-z]{2}/g, 'O estado deve ser composto apenas de letras')
});

const validateIdtype = yup.object().shape({
	id: yup.number().positive().integer()
});

module.exports = {
    validateClientFields,
    validateIdtype
};