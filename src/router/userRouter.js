const { Router } = require('express');
const { registerUser, editPassword, userDetails, updateUser } = require('../controllers/userController');
const { validateBodyFields, validateBodyEditPassword } = require('../middlewares/userMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.post('/', validateBodyFields, registerUser);
router.patch('/redefinir', validateBodyEditPassword, editPassword);
router.use(validateToken);
router.get('/', userDetails);
router.put('/', validateBodyFields, updateUser);

module.exports = router;