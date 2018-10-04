'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: 'Email has to be unique'
    },
    password: String,
    thirdpartylogin: String
},{
    timestamps: true
})

UserSchema.plugin(beautifyUnique)
const User = mongoose.model('User', UserSchema)

module.exports = User