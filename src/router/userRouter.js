const { Router } = require('express');
const { registerUser, editPassword, userDetails, updateUser } = require('../controllers/userController');
const { validateBodyRegister, validateBodyEditPassword, validateBodyUpdate } = require('../middlewares/userMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.post('/', validateBodyRegister, registerUser);
router.patch('/redefinir', validateBodyEditPassword, editPassword);
router.use(validateToken);
router.get('/', userDetails);
router.put('/', validateBodyUpdate, updateUser);

module.exports = router;