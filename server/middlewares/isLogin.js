'use strict'
const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isLogin(req,res,next){
    if(req.headers.hasOwnProperty('token')){

        jwt.verify(req.headers.token, process.env.SECRETTOKEN, (err,decoded)=>{
            if(!err){
                // find the user
                User.findOne({
                    _id: decoded.userid
                })
                  .then( user=>{
                        if(user){
                            next()
                        }else{
                            res.status(400).json({
                                msg: 'Login User not found'
                            })
                        }
                  })
                  .catch(error =>{
                      res.status(500).json({
                          msg: 'ERROR: ',error
                      })
                  })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })

    }else{
        res.status(401).json({
            msg: 'Token not found, You are not authorized'
        })
    }
}

module.exports = isLogin