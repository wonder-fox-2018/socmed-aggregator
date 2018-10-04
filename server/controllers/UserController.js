'use strict'

const User = require('../models/user')
const hashPassword = require('../helpers/hashPassword')
const isEmail = require('../helpers/isEmail')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLECLIENTID);
const axios = require('axios')

class UserController {

    // regular register
    static userRegister(req,res){
        // check the email first 
        if(isEmail(req.body.email)){
            let hash = hashPassword(req.body.password)
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                thirdpartylogin: 'no'
            })
            .then( user =>{
                // get the token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err,token) =>{
                    if(!err){
                        res.status(200).json({
                            msg: 'Register success',
                            token: token
                        })
                    }else{
                        res.status(500).json({
                            msg: 'ERROR: ',err
                        })
                    }
                })
            })
            .catch( error=>{
                res.status(500).json({
                    msg: 'ERROR: ',error
                })
            })
        }else{
            res.status(500).json({
                msg: 'Please check your email'
            })
        }
    }

    // regular login
    static userLogin(req,res){
        if(isEmail(req.body.email)){
            let hash = hashPassword(req.body.password)

            User.findOne({
                email: req.body.email, password: hash
            })
              .then(user =>{
                   if(user){
                       jwt.sign({
                          userid: user._id,
                          name: user.name,
                          email: user.email
                       },process.env.SECRETTOKEN, (err,token)=>{
                           if(!err){
                               res.status(200).json({
                                   msg: 'Login successful',
                                   token: token
                               })
                           }else{
                               res.status(500).json({
                                   msg: 'ERROR: ', err
                               })
                           }
                       })
                   }else{
                        res.status(400).json({
                            msg: 'User not found'
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
                msg: 'Please check your email'
            })
        }
    }

    // google login
    static googleLogin(req,res){
        // console.log('TOKEN------->' , req.body.googletoken)
        console.log('GOOGLE CLIENT ID----> ',process.env.GOOGLECLIENTID )
        let tokenverify = new Promise( (resolve, reject)=>{
			client.verifyIdToken({
			idToken: req.body.googletoken,
			audience: process.env.GOOGLECLIENTID
			}, (err,result)=>{
				if(!err){
					const payload = result.getPayload()
                    const userid = payload['sub']
                    // console.log('USER ID---->', userid)
					resolve(userid)
				}else{
					reject(err)
				}
			})
        })
        .then(userid =>{
            console.log('test userid--->', userid )
            axios({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.googletoken}`
            })
             .then(result =>{
                console.log('RESULT----->' , result)
                res.status(200).json({
                    msg: 'Login Google Success',
                    data: result
                })
             })
             .catch(error =>{
                res.status(500).json({
                    msg: 'ERROR - Google Login: ',error
                })     
             })
        })
        .catch(err =>{
            res.status(500).json({
                msg: 'ERROR - Google Login: ',err
            })
        })
    }
}

module.exports = UserController