const router = require('express').Router();
const { gSignIn } = require('../controllers/users')
const isLogin = require('../middlewares/isLogin')

router.get('/gsignin', gSignIn)
router.get('/check', isLogin, (req, res) => { res.status(200).json({isLogin: true, name: req.userName}) })

module.exports = router