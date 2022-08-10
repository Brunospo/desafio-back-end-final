/* eslint-disable indent */
const supabase = require('../utils/supabase');
const { BadRequestError } = require('../utils/apiErros');

const uploadImage = async (req, res) => {

    const { imagem } = req.body;

    const name = `${Date.now()}.jpg`;

    const buffer = Buffer.from(imagem, 'base64');

    const { error } = await supabase
        .storage
        .from('uploadarquivos')
        .upload(name, buffer);

    const { publicURL } = supabase
        .storage
        .from('uploadarquivos')
        .getPublicUrl(`${name}`);

    if (error) {
        throw new BadRequestError(error);
    }

    return res.status(201).json({ publicURL });

};

module.exports = {
    uploadImage
};