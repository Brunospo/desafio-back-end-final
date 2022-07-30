const { Router } = require('express');
const { registerProduct, editProduct, listProduct, detailProduct } = require('../controllers/productController');
const { validateBodyFields, validateProductId } = require('../middlewares/productMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyFields, registerProduct);
router.put('/:id', validateProductId, validateBodyFields, editProduct);
router.get('/', listProduct);
router.get('/:id', validateProductId, detailProduct);

module.exports = router;