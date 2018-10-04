'use strict'

const express = require('express')
const router = express.Router()
const RepoController = require('../controllers/RepoController')
const isLogin = require('../middlewares/isLogin')

// get list of starred repo
router.get('/lists', (req,res) =>{
    RepoController.getListOfStarredRepo(req,res)
})

// filter/ get repository by username
router.post('/username', (req,res) =>{
    RepoController.getRepositoryByUsername(req,res)
})

// create repository
router.post('/add', isLogin,(req,res) =>{
    RepoController.createRepository(req,res)
})

// search repository 
router.post('/search' , (req,res)=>{
    RepoController.searchRepoByNameKeyword(req,res)
})

// get detail of repository
router.post('/details', (req,res)=>{
    RepoController.detailRepository(req,res)
})

// unstar repository
router.delete('/unstar', isLogin,(req,res) =>{
    RepoController.unstarRepository(req,res)
})

module.exports = router