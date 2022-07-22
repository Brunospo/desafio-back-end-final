const yup = require('../config/yup');

const validateUserFields = yup.object().shape({
	nome: yup.string().required(),
	email: yup.string().email('Formato de email inválido').required(),
	senha: yup.string().required(),
});

module.exports = validateUserFields;