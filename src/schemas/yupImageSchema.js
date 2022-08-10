const yup = require('../config/yup');

const validateImageBody = yup.object().shape({
	imagem: yup.string().required('imagem é um campo obrigatório')
});

module.exports = {
	validateImageBody
};