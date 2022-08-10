/* eslint-disable indent */
const supabase = require('../utils/supabase');
const { BadRequestError } = require('../utils/apiErros');

const uploadImage = async (req, res) => {

    const { url_produto, nome } = req.body;

    const name = `${nome}${Date.now()}`;

    const buffer = Buffer.from(url_produto, 'base64');

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