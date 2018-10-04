# StarAggregator Server

## API Documentation
List of Routes:   

Route                            | HTTP | Description                                                       | Input
---------------------------------|------|-------------------------------------------------------------------|--------
/repos/                          | GET  | List all repositories                                             | header: access_token
/repos/starred                   | GET  | List all starred repositories                                     | header: access_token
/repos/filter                    | POST | List starred repositories with filter                             | header: access_token, body: { (one of the list's object keys): (desired value) }
/repos/searchByName/:name/:owner | GET  | List all repositories with keyword = :name that's owned by :owner | header: access_token
/repos/                          | POST | Create a new repository                                           | header: access_token, body: { name: (repository name), description: (description) }
/repos/:username                 | GET  | List all repositories of user with username = :username           | -
/repos/star/:owner/:repo         | GET  | Star a repository of :owner that's named :repo                    | header: access_token
/repos/unstar/:owner/:repo       | GET  | Unstar a repository of :owner that's named :repo                  | header: access_token
/users/                          | GET  | Generate a JWT from a GitHub access token                         | header: access_token

## Usage
With npm:
```  
npm install
npm start (node) / npm run dev (nodemon)
``` 
##### Access HacktivGit via http://localhost:3000