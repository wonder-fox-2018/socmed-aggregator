'use strict'

const request = require('request')

class RepoController{

    // get list of starred repo
    static getListOfStarredRepo(req,res){
        request({
            method: 'GET',
            url: `https://api.github.com/user/starred`,
            headers:{
                'User-Agent': 'request',
                Authorization: 'token '+process.env.GITTOKEN
            }
        },(err, response,body)=>{
            if(!err){
                res.status(200).json({
                    msg: 'List of Repo',
                    data: JSON.parse(body)
                })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })
    }

    // get repository by username
    static getRepositoryByUsername(req,res){
        request({
            method: 'GET',
            url: `https://api.github.com/users/${req.body.username}/repos`,
            headers:{
                'User-Agent': 'request',
                Authorization: 'token '+process.env.GITTOKEN
            }
        },(err, response,body) =>{
            if(!err){
                res.status(200).json({
                    msg: `List of repos from ${req.body.username}`,
                    data: JSON.parse(body)
                })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })
    }

    // create repository
    static createRepository(req,res){
        console.log('controller --->', req.body),
        console.log('headers----->', req.headers)
        const options = {
            url : 'https://api.github.com/user/repos',
            headers : {
                'User-Agent' : 'request',
                Authorization : 'token '+ process.env.GITTOKEN
            }
        }
        options.body = JSON.stringify({
            name : req.body.name,
            description : req.body.description
        })

        request.post(options,(err,response,body)=>{
            if(err){
                res.status(500).json({ msg : err});
            }else {
                res.status(200).json({
                    msg : `repo ${req.body.name} has been created`,
                    data : JSON.parse(body)
                })
            }
        })
    }

    // search repository by username/owner
    static searchRepoByNameKeyword (req,res){
        request({
            method: 'GET',
            url: `https://api.github.com/user/starred`,
            headers:{
                'User-Agent': 'request',
                Authorization: 'token '+process.env.GITTOKEN
            }
        },(err, response,body)=>{
            if(!err){
                let data = JSON.parse(body)
                let sortedArr = []
                let regex = new RegExp(`${req.body.name}`,'i');

                data.forEach(repo => {
                    if(regex.test(repo['name'])){
                        sortedArr.push(repo)
                    }
                });

                res.status(200).json({
                    msg: `List of Repos by keyword ${req.body.name}`,
                    data: sortedArr
                })

            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })   
    }

    // detail of repository
    static detailRepository(req,res){
        request({
            method: 'GET',
            url: `https://api.github.com/users/${req.body.username}/repos`,
            headers:{
                'User-Agent': 'request',
                Authorization: 'token '+process.env.GITTOKEN
            }
        },(err, response,body)=>{
            if(!err){
                let data = JSON.parse(body)
                let sortedArr = []
                // console.log('hasil----->', data)
                data.forEach(repo => {
                    if(repo.name === req.body.name){
                        sortedArr.push(repo)
                    }
                });
                res.status(200).json({
                    msg: `Details of Starred Repo by name ${req.body.name}`,
                    data: sortedArr
                })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })
    }

    // unstar repository
    static unstarRepository (req,res){
        const options = {
            url : `https://api.github.com/user/starred/${req.body.username}/${req.body.repository}`,
            headers : {
                'User-Agent' : 'request',
                Authorization : 'token '+process.env.GITTOKEN
            }
        }
        request.delete(options,(err,response,body)=>{
            if(err){
                res.status(500).json({ msg : err});
            }else{
                res.status(200).json({
                    msg : `Repo ${req.body.repository} has been unstarred`
                })
            }
        })
    }
}

module.exports = RepoController