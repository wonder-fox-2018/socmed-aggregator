var express = require('express');
var app = express();
var cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/socmed')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/', indexRouter)
app.use('/user', userRouter)

module.exports = app;
