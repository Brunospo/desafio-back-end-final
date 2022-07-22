const yup = require('../config/yup');

const validateAuthenticationFields = yup.object().shape({
	email: yup.string().email('Formato de email inválido').required(),
	senha: yup.string().required()
});

module.exports = validateAuthenticationFields;