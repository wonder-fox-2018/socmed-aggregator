const express = require('express');
const router = express.Router();
const request = require('request')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "628551800255-g2qnsf4gcs52oevo1qigl9pbn7ut2otg.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Connected to Server')
});

router.post('/signin/google', (req, res, next)=> {
  var googleToken = req.body.googleToken
  
  const ticket = new Promise((resolve, reject)=> {
      client.verifyIdToken({
      idToken: googleToken,
      audience: CLIENT_ID
    }, (err, data) => {
      if(!err){
        const payload = data.getPayload();
        const userid = payload['sub'];
        resolve(userid)
      } else {
        reject(err)
      }
    })
  })
  .then(userid => {
    // console.log(userid)
    const option = {
      url : `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`,
    }
    request.get(option, (error, incomingMessage, response) => {
      if(error) res.send(error)
      let data = JSON.parse(response)
      console.log(data.email)
      let token = jwt.sign({
        email : data.email,
        name : data.name
      }, process.env.SECRET_KEY)
      res.status(200).json({token : token})
    })
  })
  .catch(err => {
    console.log(err)
  })
 
})

router.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=repo`)
})

router.get('/login/callback', (req, res) => {
  const option = {
    url : `https://github.com/login/oauth/access_token`,
    headers : {
      'User-Agent' : 'request'
    },
    body : {
      client_id : process.env.CLIENT_ID,
      client_secret : process.env.CLIENT_SECRET,
      code : req.query.code
    },
    json : true
  }
  request.post(option, (error, incomingMessage, response) => {
    if(error) res.send(error)
    res.send(response)
  })

})

router.get('/starred', (req, res)=> {
  const option = {
    url : "https://api.github.com/user/starred",
    headers : {
      'User-Agent' : 'request',
      'Authorization' : `token ${process.env.ACCESS_TOKEN}`
    },
    json : true
  }
  request.get(option, (error, incomingMessage, response) => {
    if(error) res.send(error)
      res.send(response)
  })
})

router.get('/create', (req, res)=> {
  const option = {
    url : `https://api.github.com/user/repos`,
    headers : {
      'User-Agent' : 'request',
      'Authorization' : `token ${process.env.ACCESS_TOKEN}`
    },
    body : {
      name : 'hello word Ke dua with oauth',
      desciption : 'this repo from localhost',
      private : false,
      has_issues :true,
      has_projects : true,
      has_wiki : true
    },
    json : true
  }
  request.post(option, (error, incomingMessage, response) => {
    if(error) res.status(500).json({message : error})
      res.status(200).json(response)
  })
})

router.get('/search/:user', (req, res) => {
  const option = {
    url : `https://api.github.com/search/users?q=${req.params.user}`,
    headers : {
      'User-Agent' : 'request',
      'Authorization' : `token ${process.env.ACCESS_TOKEN}`
    },
    json : true
  }
  request.get(option, (error, incomingMessage, response) => {
    if(error) res.status(500).json({message : error})
      res.status(200).json(response)
  })
})

router.get('/repo/:user', (req, res) => {
  const option = {
    url : `https://api.github.com/users/${req.params.user}/repos`,
    headers : {
      'User-Agent' : 'request',
      'Authorization' : `token ${process.env.ACCESS_TOKEN}`
    },
    json : true
  }
  request.get(option, (error, incomingMessage, response) => {
    if(error) res.status(500).json({message : error})
      res.status(200).json(response)
  })
})

router.get('/unstar', (req, res) => {
  const option = {
    url : `https://api.github.com/user/starred/${req.query.owner}/${req.query.repo}`,
    headers : {
      'User-Agent' : 'request',
      'Authorization' : `token ${process.env.ACCESS_TOKEN}`
    },
    json : true
  }
  request.delete(option, (error, incomingMessage, response) => {
    if(error ) res.send(error)
    res.send(response)
  })
})








module.exports = router;
