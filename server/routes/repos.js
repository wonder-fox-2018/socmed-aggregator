const router = require('express').Router();
const { listAll, listStarred, listStarredFilter, searchByName, create, listByUsername, star, unstar } = require('../controllers/repos')
const isLogin = require('../middlewares/isLogin')

router.get('/', listAll)
router.get('/starred', listStarred)
router.post('/filter', listStarredFilter)
router.get('/searchByName/:name/:owner', searchByName)
router.post('/', isLogin, create)
router.get('/:username', listByUsername)
router.get('/star/:owner/:repo', isLogin, star)
router.get('/unstar/:owner/:repo', isLogin, unstar)

module.exports = router