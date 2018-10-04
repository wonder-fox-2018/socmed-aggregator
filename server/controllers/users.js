const jwt = require('jsonwebtoken')

module.exports = {

    generateJWT: function (req, res) {
        jwt.sign(req.headers.access_token, process.env.JWT_KEY, (err, token) => {
            if (err) {
                res.status(500).json({message: err})
            } else {
                res.status(200).json({token: token})
            }
        })
    }
}