'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// regular login
router.post('/login', (req,res)=>{
    UserController.userLogin(req,res)  
})

// regular register
router.post('/register', (req,res) =>{
    UserController.userRegister(req,res)
})

// google login
router.post('/googlelogin', (req,res) =>{
    UserController.googleLogin(req,res)
})

module.exports = router
