const { Router } = require('express');
const { registerUser, editPassword, userDetails } = require('../controllers/userController');
const { validateBodyRegister, validateBodyEditPassword } = require('../middlewares/userMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.post('/', validateBodyRegister, registerUser);
router.patch('/redefinir', validateBodyEditPassword, editPassword);
router.use(validateToken);
router.get('/', userDetails);

module.exports = router;