const jwt = require('jsonwebtoken')
require('dotenv').config()

class Midleware{

    static authorize(req, res, next){
        console.log(req.headers)
        if(req.headers.hasOwnProperty('token')){
                // const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
                next()
        }
        else {
            res.status(500).json({
                message : `you have no right to access this feature`
            })
        }

    }
  
}

module.exports = Midleware