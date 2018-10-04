const router = require('express').Router();
const { generateJWT } = require('../controllers/users')

router.get('/', generateJWT)

module.exports = router