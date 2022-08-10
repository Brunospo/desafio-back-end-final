const { Router } = require('express');
const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { validateImage } = require('../middlewares/uploadImageMiddleware');
const { uploadImage } = require('../controllers/uploadImageController');

const router = Router();

router.use(validateToken);
router.post('/', validateImage, uploadImage);

module.exports = router;