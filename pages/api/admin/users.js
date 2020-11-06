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
    console.log(data)
    return data
  }

  switch(req.method) {
    case 'POST':
      console.log(req)
      break;
    case 'GET':
          bcrypt.compare(ADMIN_TOKEN, req.cookies.authToken, function(err, result) {
              if(result) {
                fetchUserList()
                .then((data) => res.status(200).json(data.allUsers.data))
              } else {
                res.status(401).json({error: "Unauthorized access attempt"})
              }
          })
      break;
    default:
      console.log("Other of type:", req.method)
      res.statusCode = 400
    }
res.end;
}