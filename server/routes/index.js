const express = require('express')
const router = express.Router()
var request = require('request')
require('dotenv').config()

router.get('/', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.client_id}&scope=repo`)})

router.get('/githublogin', (req, res) => {
    request({
        url: 'https://github.com/login/oauth/access_token',
        method: 'post',
        json: true,
        body: {
            client_id: process.env.client_id,
            client_secret : process.env.client_secret, 
            code : req.query.code
        }
    }, (err, incomingMsg, respon) => {
        if(err){
            res.send(err)
        } else {
            res.send(respon)
        }
    })
})

module.exports = router