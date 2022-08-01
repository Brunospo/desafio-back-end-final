const { Router } = require('express');
const { validateBodyClient, validateClientID } = require('../middlewares/clientMiddleware');
const { registerClient, updateClient, listClient, detailClient } = require('../controllers/clientController');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyClient, registerClient);
router.put('/:id', validateClientID, updateClient);
router.get('/', listClient);
router.get('/:id', detailClient);

module.exports = router;