const { Router } = require('express');
const { registerProduct, editProduct, listProduct, detailProduct, deleteProduct } = require('../controllers/productController');
const { validateBodyFields, validateProductId } = require('../middlewares/productMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyFields, registerProduct);
router.put('/:id', validateProductId, validateBodyFields, editProduct);
router.get('/', listProduct);
router.get('/:id', validateProductId, detailProduct);
router.delete('/:id', validateProductId, deleteProduct);

module.exports = router;