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
        fitnessplan{
          data{
            _id
            isCurrent
            sessionTitle
            cardInfo {
              data{
                _id
                cardTitle
                userInputData
                listOfActivities
              }
            }
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

  async function modifyFoodData(foodData) {
  
    const mutation = /* GraphQL */ `
    mutation updateFoodDiary($id: ID!, $type: String!, $time: Int!, $details: String!) {
        updateFoodDiary(
            id: $id
            data:{
                type: $type,
                time: $time,
                details: $details,
            }
        ) {
        _id
        }
      }
    `
    const variables = {
    "id": foodData.ElementId,
    "type": foodData.type,
    "time": foodData.time,
    "details": foodData.details
    }
    const data = await graphQLClient.request(mutation, variables);

    return data
  }

  async function deleteFoodData(id) {
  
    const mutation = /* GraphQL */ `
    mutation deleteFoodDiary($id: ID!) {
        deleteFoodDiary(
            id: $id
        ) {
        _id
        }
      }
    `
    const variables = {
    "id": id
    }
    
    const data = await graphQLClient.request(mutation, variables);

    return data
  }

  switch(req.method) {
  case 'GET':
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
    break;

  case 'POST':
    sendFoodData(req.body)
    .then((data) => res.status(200).json({id: data.createFoodDiary._id}))
    .catch((data) => res.status(400).json({error: data}))
    break;

  case 'PUT':
    console.log("PUT: ", req.body)
    modifyFoodData(req.body)
    .then((data) => res.status(200).json({id: data.updateFoodDiary._id}))
    .catch((data) => res.status(400).json({error: data}))
    break;

  case 'DELETE':
    console.log("Delete: ", req.body)
    deleteFoodData(req.body.DeleteId)
    .then((data) => res.status(200).json({id: data.deleteFoodDiary._id}))
    .catch((data) => res.status(400).json({error: data}))
    break;

  default:
    console.log("Other of type:", req.method)
    res.statusCode = 400
  }
res.end;
}