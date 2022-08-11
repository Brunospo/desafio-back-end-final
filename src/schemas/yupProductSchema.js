const yup = require('../config/yup');

const validateRegisterFields = yup.object().shape({
	descricao: yup.string().required(),
	quantidade_estoque: yup.number().min(0).integer('quantidade_estoque deve receber um número inteiro').required(),
	valor: yup.number().min(0).integer('O valor deve ser informado em cantavos').required(),
	categoria_id: yup.number().positive().integer('categoria_id deve receber um número inteiro').required(),
	produto_imagem: yup.string().url().min(1)
});

const validateIdtype = yup.object().shape({
	id: yup.number().positive().integer()
});

module.exports = {
	validateRegisterFields,
	validateIdtype
};