const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.headers.access_token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            next("You are not logged in, please log in to see the data")
        } else {
            req.access_token = decoded
            next()
        }
    })
}