const router = require('express').Router();
const { generateJWT } = require('../controllers/users')
const isLogin = require('../middlewares/isLogin')

router.get('/signin', generateJWT)
router.get('/check', isLogin, (req, res) => { res.status(200).json({isLogin: true}) })

module.exports = router