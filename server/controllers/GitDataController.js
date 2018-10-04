'use strict'
const request = require('request')

class GitDataController {
    //open git access
    static accessGitData(req,res){
        request({
            url: 'https://github.com/login/oauth/access_token',
            method: 'POST',
            json: true,
            body: {
                client_id: process.env.CLIENTID,
                client_secret: process.env.CLIENTSECRET,
                code: req.query.code
            }
        },(error, response, body)=>{
            if(!error){
                console.log('BODY-->', body)
                res.send('ACCESS GRANTED')
                // res.send(body.access_token)
                // request({
                //     url: `https://api.github.com/user?access_token=${body.access_token}`,
                //     method: 'GET',
                //     headers: {
                //         'User-Agent': 'request'   
                //     }
                // },(error, response, body)=>{
                //     if(!error){
                //         res.status(200).json({
                //             msg: 'User Data',
                //             data: body
                //         })
                //     }else{
                //         res.status(500).json({
                //             msg: 'ERROR: ',error
                //         })
                //     }
                // })
            }else{
                // console.log('ERROR: ', error)
                res.status(500).json({
                    msg: 'ERROR: ',error
                })
            }
        })
    }
}

module.exports = GitDataController