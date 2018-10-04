'use strict'

const express = require('express')
const router = express.Router()
const GitDataController = require('../controllers/GitDataController')

router.get('/', (req,res)=>{
    // console.log('QUERY.code', req.query.code)
    GitDataController.accessGitData(req,res)
})

module.exports = router