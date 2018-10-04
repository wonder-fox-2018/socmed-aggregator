const request = require('request')

module.exports = {

    listAll: function (req, res) {
        let options = {
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            }
        };
        
        request.get(options, (err, response, body) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({message: 'List of starred repositories acquired', list: JSON.parse(body)})
            }
        });
    },

    listStarred: function (req, res) {
        let options = {
            url: 'https://api.github.com/user/starred',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            }
        };
        
        request.get(options, (err, response, body) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({message: 'List of starred repositories acquired', list: JSON.parse(body)})
            }
        });
    },

    listStarredFilter: function (req, res) {
        let options = {
            url: 'https://api.github.com/user/starred',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            }
        };
        
        request.get(options, (err, response, body) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                let key = Object.keys(req.body)[0]
                let value = req.body[key]
                let parsedBody = JSON.parse(body)
                let result = [];
                for (var i = 0; i < parsedBody.length; i++) {
                    if (parsedBody[i][key].slice(0, value.length) === value) {
                        result.push(parsedBody[i])
                    }
                }
                res.status(200).json({message: 'List of starred repositories acquired & filtered', list: result})
            }
        });
    },
    
    searchByName: function (req, res) {
        let options = {
            url: `https://api.github.com/search/repositories?q=${req.params.name}+user:${req.params.owner}+fork:true`,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            }
        };

        request.get(options, (err, response, body) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({list: JSON.parse(body)})
            }
        })
    },

    create: function (req, res) {
        let options = {
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            },
            body: JSON.stringify({
                name: req.body.name,
                description: req.body.description
            })
        };

        request.post(options, (err) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(201).json({message: `Repository '${req.body.name}' has been created`})
            }
        })
    },

    listByUsername: function (req, res) {
        let options = {
            url: `https://api.github.com/users/${req.params.username}/repos`,
            headers: {
                'User-Agent': 'request',
            }
        };

        request.get(options, (err, response, body) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({message: `List of repositories by ${req.params.username}`, list: JSON.parse(body)})
            }
        })
    },

    star: function (req, res) {
        let options = {
            url: `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            }
        };

        request.put(options, (err) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({message: `Repository '${req.params.repo}' by ${req.params.owner} has been starred`})
            }
        })
    },

    unstar: function (req, res) {
        let options = {
            url: `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${req.access_token}`
            }
        };

        request.delete(options, (err) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(200).json({message: `Repository '${req.params.repo}' by ${req.params.owner} has been unstarred`})
            }
        })
    }
}