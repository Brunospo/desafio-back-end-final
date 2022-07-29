const { Router } = require('express');
const { registerProduct } = require('../controllers/productController');
const { validateBodyRegister } = require('../middlewares/productMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyRegister, registerProduct);

module.exports = router;