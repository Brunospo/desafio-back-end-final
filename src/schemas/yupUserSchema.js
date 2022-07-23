const yup = require('../config/yup');

const validateUserFields = yup.object().shape({
	nome: yup.string().required(),
	email: yup.string().email('Formato de email inválido').required(),
	senha: yup.string().required()
});

const validateEditPassword = yup.object().shape({
	email: yup.string().email('Formato de email inválido').required(),
	senha_antiga: yup.string().required(),
	senha_nova: yup.string().required()
});


module.exports = {
	validateUserFields,
	validateEditPassword
};