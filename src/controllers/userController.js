/* eslint-disable linebreak-style */
const { encryptPassword } = require('../utils/bcrypt');
const knex = require('../config/knexConnection');
const transporter = require('../config/nodemailer');

const registerUser = async (req, res) => {
	const { nome, email, senha } = req.body;

	try {
		const encryptedPassword = await encryptPassword(senha);

		const [user] = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(['id', 'nome', 'email']);

		return res.status(201).json({ usuario: user });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const editPassword = async (req, res) => {
	const { email, senha_nova } = req.body;

	try {
		const encryptedPassword = await encryptPassword(senha_nova);

		await knex('usuarios').where({ email }).update({ senha: encryptedPassword });

		const dataSend = {
			from: 'suporte@desafiofinalcubos.com',
			to: email,
			subject: 'Password changed',
			text: 'Your password has been changed successfully'
		};

		transporter.sendMail(dataSend, (error) => {
			if (error) {
				return res.json({ message: error.message });
			} else {
				return console.json();
			}
		});

		return res.status(200).json({ message: 'Senha alterada com sucesso' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const userDetails = async (req, res) => {

	try {
		const { id, nome, email } = req.usuario;

		return res.status(200).json({ usuario: { id, nome, email } });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	registerUser,
	editPassword,
	userDetails
};	