const { Router } = require('express');
const { registerProduct, editProduct, listProduct, detailProduct, deleteProduct } = require('../controllers/productController');
const { validateBodyFields, validateProductId, validateCategoryQuery, validateIfHasProductInOrder, deleteSupabaseImgIfExists } = require('../middlewares/productMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyFields, registerProduct);
router.put('/:id', validateProductId, validateBodyFields, deleteSupabaseImgIfExists, editProduct);
router.get('/', validateCategoryQuery, listProduct);
router.get('/:id', validateProductId, detailProduct);
router.delete('/:id', validateProductId, validateIfHasProductInOrder, deleteSupabaseImgIfExists, deleteProduct);

module.exports = router;