const { Router } = require('express');
const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { registerOrder } = require('../controllers/orderController');
const { validateBodyRegister } = require('../middlewares/orderMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyRegister, registerOrder);

module.exports = router;