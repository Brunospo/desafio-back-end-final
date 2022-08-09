const { Router } = require('express');
const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { registerOrder, listOrders } = require('../controllers/orderController');
const { validateBodyRegister, validateQueryParam } = require('../middlewares/orderMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyRegister, registerOrder);
router.get('/', validateQueryParam, listOrders);

module.exports = router;