const { Router } = require('express');
const { registerUser, editPassword, userDetails } = require('../controllers/userController');
const { validateBodyRegister, validateBodyEditPassword } = require('../middlewares/userMiddleware');
const { validateLoggedUser } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.post('/', validateBodyRegister, registerUser);
router.patch('/redefinir', validateBodyEditPassword, editPassword);
router.get('/', validateLoggedUser, userDetails);

module.exports = router;