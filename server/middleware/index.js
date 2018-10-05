let CLIENT_ID = "334397647222-qm41fat898u8c5vtlfsvtlj071qnunba.apps.googleusercontent.com"
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
    googleCheck: function(req, res, next) {
        let googleToken = req.body.token
        let ticket = new Promise(function(resolve, reject) {
            client.verifyIdToken({
            idToken: googleToken,
            audience: CLIENT_ID
            }, function(err, data) {
            if (!err) {
                let payload = data.getPayload()
                let userid = payload['sub']
                resolve(userid)
            } else {
                reject(err)
            }
            })
        })
        .then(userid => {
           next()
        })
        .catch(err => {
            console.log(err)
        })
    },
    isLogin: function(req, res){
        if(req.headers.userToken){         
            jwt.verify(req.headers.userToken, process.env.secret_key, function(err, decoded){
                if(err){
                    res.status(403).json({
                        msg: "Wrong Token"
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(403).json({
                msg: "Please Login first"
            })
        }


    }



}