const { GraphQLClient } = require('graphql-request')
const bcrypt = require('bcrypt');

const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_WORD

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export default (req, res) => {

  async function fetchUserList(user) {
  
    const listUsers = /* GraphQL */
    `{
      allUsers {
        data {
            _id
            UserId
        }
      }
    }`
    
    let data = await graphQLClient.request(listUsers)
    return data
  }

  async function addUser(user) {
  
    const mutation = /* GraphQL */ `
    mutation createUser($UserId: String!) {
        createUser(
            data: {UserId: $UserId}
        ) {
        _id
        }
      }
    `
    const variables = {
    "UserId": user
    }
    
    let data = await graphQLClient.request(mutation, variables);
    return data
  }

  bcrypt.compare(ADMIN_TOKEN, req.cookies.authToken, function(err, result) {
    if(result) {
      switch(req.method) {
      case 'PUT':
        addUser(req.body.userId)
          .then((data) => res.status(200).json({id: data.createUser._id}))
          .catch((data) => res.status(400).json({error: data}))
        console.log(req)
        break;
      case 'GET':
        fetchUserList()
          .then((data) => res.status(200).json(data.allUsers.data))
          .catch((data) => res.status(400).json({error: data}))
        break;
      default:
        console.log("Other of type:", req.method)
        res.statusCode = 400
      }
      } else {
                res.status(401).json({error: "Unauthorized access attempt"})
              }
  })
  res.end;
}