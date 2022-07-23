const { Router } = require('express');
const { registerUser, editPassword } = require('../controllers/userController');
const { validateBodyRegister, validateBodyEditPassword } = require('../middlewares/userMiddleware');

const router = Router();

router.post('/', validateBodyRegister, registerUser);
router.patch('/redefinir', validateBodyEditPassword, editPassword);

module.exports = router;