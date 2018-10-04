const router = require('express').Router();
const { listAll, listStarred, listStarredFilter, searchByName, create, listByUsername, star, unstar } = require('../controllers/repos')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, listAll)
router.get('/starred', isLogin, listStarred)
router.post('/filter', isLogin, listStarredFilter)
router.get('/searchByName/:name/:owner', isLogin, searchByName)
router.post('/', isLogin, create)
router.get('/:username', listByUsername)
router.get('/star/:owner/:repo', isLogin, star)
router.get('/unstar/:owner/:repo', isLogin, unstar)

module.exports = router