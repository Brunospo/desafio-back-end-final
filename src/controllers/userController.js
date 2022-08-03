const { encryptPassword } = require('../utils/bcrypt');
const knex = require('../config/knexConnection');
const sgMail = require('../config/sendgrid');

const registerUser = async (req, res) => {
	const { nome, email, senha } = req.body;

	const encryptedPassword = await encryptPassword(senha);

	const [user] = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(['id', 'nome', 'email']);

	return res.status(201).json({ usuario: user });
};

const editPassword = async (req, res) => {
	const { email, senha_nova } = req.body;

	const msg = {
		to: email,
		from: process.env.SENDGRID_EMAIL, //eslint-disable-line
		subject: '🚨 Alerta de segurança',
		text: 'A senha da sua Conta do PDV foi alterada!'
	};

	const encryptedPassword = await encryptPassword(senha_nova);

	await knex('usuarios').where({ email }).update({ senha: encryptedPassword });

	res.json({ message: 'Senha alterada com sucesso' });

	await sgMail.send(msg);
};

const userDetails = async (req, res) => {
	return res.json({ usuario: { ...req.usuario } });
};

const updateUser = async (req, res) => {
	const { nome, email, senha } = req.body;

	const encryptedPassword = await encryptPassword(senha);

	const [user] = await knex('usuarios').update({ nome, email, senha: encryptedPassword }).where({ id: req.usuario.id }).returning(['id', 'nome', 'email']);

	return res.status(201).json({ usuario: user });
};

module.exports = {
	registerUser,
	editPassword,
	userDetails,
	updateUser
};	