/* eslint-disable no-undef */
const supabase = require('../config/supabase');
const { BadRequestError } = require('../utils/apiErros');

const uploadImage = async (req, res) => {

	const { imagem } = req.body;

	const buffer = Buffer.from(imagem, 'base64');

	const { data, error } = await supabase
		.storage
		.from(process.env.SUPABASE_BUCKET)
		.upload(`${Date.now()}.jpg`, buffer, {
			contentType: 'image/jpg'
		});

	if (error) {
		throw new BadRequestError(error);
	}

	const imgURL = `${process.env.SUPABASE_STORAGE_URL}${data.Key}`;

	return res.status(201).json({ imgURL });

};

module.exports = {
	uploadImage
};