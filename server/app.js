'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const CallbackGitRouter = require('./routes/CallbackGitRouter')
const RepoRouter = require('./routes/RepoRouter')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())
app.use('/callbackgit' , CallbackGitRouter)
app.use('/repos', RepoRouter)

app.get('/', (req, res) =>{
    res.send('OK')
})

app.listen(process.env.PORT || 3000 , () =>{
    console.log('You are listening to PORT ',process.env.PORT)
})