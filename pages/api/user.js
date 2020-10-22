const { GraphQLClient } = require('graphql-request')
const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export default (req, res) => {

  let serverData = ""

  async function lookupUserID(user) {
  
    const findIdQuery = /* GraphQL */
    `{
      findId(UserId: "${user}") {
        _id
      }
    }`
    
    serverData = await graphQLClient.request(findIdQuery)
  }

  switch(req.method) {
  case 'GET':
      if(req.query?.id != "null") {
        lookupUserID(req.query?.id)
          .then(() => {
            res.json(serverData)
            res.statusCode = 200
          })
          .catch((error) => {
            res.json({error: error})
            res.statusCode = 400
          })
      } else {
        res.json({error: "No valid UserId sent"})
        res.statusCode = 400
      }
    break;
  //Add PUT DELETE etc here
  default:
    console.log("Other of type:", req.method)
    res.statusCode = 400
  }
res.end;
}