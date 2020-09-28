const { GraphQLClient } = require('graphql-request')
//import {FAUNA_KEY} from '../../fauna.js'
const endpoint = 'https://graphql.fauna.com/graphql'
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});
const FAUNA_KEY = process.env.FAUNA_KEY

export default (req, res) => {

  let serverData = ""

  async function fetchUserData(user) {
  
    const findIdQuery = /* GraphQL */
    `{
      findId(UserId: "${user}") {
        _id
        UserId
        fooddiary{
          data{
            _id
            type
            time
            details
          }
        }
      }
    }`
    
    serverData = await graphQLClient.request(findIdQuery)
  }

  async function sendFoodData(foodData) {
  
    const mutation = /* GraphQL */ `
    mutation createFoodDiary($id: ID!, $type: String!, $time: Int!, $details: String!) {
        createFoodDiary(
            data:{
                type: $type,
                time: $time,
                details: $details,
                UserId:{
                  connect: $id
                }
            }
        ) {
        _id
        }
      }
    `
    const variables = {
    "id": foodData.id,
    "type": foodData.type,
    "time": foodData.time,
    "details": foodData.details
    }
    const data = await graphQLClient.request(mutation, variables);

    return data
  }
  
  if (req.method === 'GET') {
      if(req.query?.id != "null") {
        fetchUserData(req.query?.id)
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
  } else if (req.method === 'POST') {
    sendFoodData(req.body)
    .then((data) => res.status(200).json({id: data.createFoodDiary._id}))
    .catch((data) => res.status(400).json({error: data}))

  } else {
    console.log("Other of type:", req.method)
    res.statusCode = 400
  }
res.end;
}