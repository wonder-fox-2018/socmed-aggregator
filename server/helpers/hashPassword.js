'use strict'

const crypto = require('crypto');

function hashPassword(input){
    const hash = crypto.createHmac('sha256', process.env.SECRET)
                   .update(input)
                   .digest('hex');
    return hash
}

module.exports = hashPassword