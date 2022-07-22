const { Router } = require('express');
const { registerUser } = require('../controllers/userController');
const { validateBodyRegister } = require('../middlewares/userMiddleware');

const router = Router();

router.post('/', validateBodyRegister, registerUser);

module.exports = router;