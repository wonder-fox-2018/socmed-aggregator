const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const CLIENT_ID = process.env.CLIENT_ID
const axios = require('axios')

module.exports = {

    gSignIn: function (req, res) {
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);
        const gToken = req.headers.id_token
        const ticket = new Promise ((resolve, reject) => {
            client.verifyIdToken({
                idToken: gToken,
                audience: CLIENT_ID,
            }, (err, ticket) => {
                if (err) {
                    reject(err)
                } else {
                    const payload = ticket.getPayload();
                    const userid = payload['sub'];
                    resolve(userid)
                }
            })
        })
        .then(userid => {
            axios({
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${gToken}`
            })
            .then(data => {
                User.findOne({
                    email: data.data.email
                })
                .then(user => {
                    if (user) {
                        if (user.gSignIn === 1) {
                            let token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_KEY)
                            res.status(200).json({token: token, name: user.name})
                        } else {
                            res.status(500).json({message: 'Sorry, but please log in manually'})
                        }
                    } else {
                        User.create({
                            email: data.data.email,
                            name: data.data.name,
                            password: 'abcde12345',
                            gSignIn: 1
                        })
                        .then(newuser => {
                            let token = jwt.sign({id: newuser._id, name: newuser.name}, process.env.JWT_KEY)
                            res.status(200).json({token: token, name: newuser.name})
                        })
                        .catch(err => {
                            res.status(500).json({message: err})
                        })
                    }
                })
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}