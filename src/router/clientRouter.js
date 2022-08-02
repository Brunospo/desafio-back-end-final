const { Router } = require('express');
const { validateBodyClient, validateId, validateUpdateBody } = require('../middlewares/clientMiddleware');
const { registerClient, updateClient, listClient, detailClient } = require('../controllers/clientController');
const { validateToken } = require('../middlewares/validateTokenMiddleware');

const router = Router();

router.use(validateToken);
router.post('/', validateBodyClient, registerClient);
router.put('/:id', validateId, validateUpdateBody, updateClient);
router.get('/', listClient);
router.get('/:id', validateId, detailClient);

module.exports = router;