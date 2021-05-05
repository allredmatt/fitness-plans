const { GraphQLClient } = require('graphql-request')
const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export default (req, res) => {
  return new Promise((resolve, reject) => {
    async function fetchAllPlans (userId) {
      const findIdQuery = /* GraphQL */
      `{
        findId(userId: "${userId}") {
          fitnessPlan{
            data{
              _id
              sessionTitle
              shortTitle
            }
          }
        }
      }`
      return await graphQLClient.request(findIdQuery)
    }

    async function fetchPlan (planId) {
      const findIdQuery = /* GraphQL */
      `{
        findFitPlanByID(id: "${planId}") {
          _id
          rating
          notes
          sessionTitle
          shortTitle
          cardInfo{
            cardTitle
            listOfActivities{
                primary
            }
          }
        } 
      }`
      return await graphQLClient.request(findIdQuery)
    }

    async function fetchCurrentSession(userId) {
      
      const findCurrentSession = /* GraphQL */
      `{
        findId(userId: "${userId}") {
          _id
          currentSession
        }
      }`
      
      return await graphQLClient.request(findCurrentSession);
    }

    async function modifyUserData (args) {

      const mutation = /* GraphQL */ `
      mutation updateUserData($id: ID!, $name: String!, $inputDataTypes: [String], $activityId: [String]!, $inputtedData: [String]) {
          updateUserInputData(
              id: $id
              data:{
                  name: $name,
                  inputDataTypes: $inputDataTypes,
                  activityId: $activityId,
                  inputtedData: $inputtedData
              }
          ) {
          _id
          }
        }
      `
      const variables = {...args}
      return await graphQLClient.request(mutation, variables);
    }

    switch(req.method) {
    case 'GET':
      if(req.body.id != "null") {
        switch(req.body.type){
        case 'list':
          fetchAllPlans(req.body.id)
            .then((data) => res.status(200).json(data))
            .catch((data) => res.status(400).json({error1: data}))
            resolve()
          break
        case 'current':
          fetchCurrentSession(req.body.id)
            .then((data) => res.status(200).json(data))
            .catch((data) => res.status(400).json({error2: data}))
            resolve()
          break
        case 'plan':
          fetchPlan(req.body.id)
            .then((data) => res.status(200).json(data))
            .catch((data) => res.status(400).json({error3: data}))
            resolve()
          break
        default:
          res.status(400).json({error: "No valid type sent"})
          resolve()
        }
      } else {
        res.status(400).json({error: "No valid UserId sent"})
        resolve()
      }
      break;
    case 'PUT':
      
      break;
    default:
      reject()
    }
  })
} 