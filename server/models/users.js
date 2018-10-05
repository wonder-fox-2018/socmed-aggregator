const mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    name:  String,
    email: {type: String, unique: true, required: true}
  });

var User = mongoose.model('User', userSchema);

module.exports = User