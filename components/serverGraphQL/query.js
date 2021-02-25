const { GraphQLClient } = require('graphql-request')
const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export async function lookupUserID(userId) {
    const findIdQuery = /* GraphQL */
    `{
        findId(userId: "${userId}") {
        _id
        currentSession
        }
    }`

    return await graphQLClient.request(findIdQuery)
}

export async function foodDataList(userId) {

    const findIdQuery = /* GraphQL */
    `{
        findId(userId: "${userId}") {
        foodDiary{
            data{
                _id
                type
                time
                details
            }
        }
        }
    }`

    return await graphQLClient.request(findIdQuery)
}

export async function foodDataById(foodId) {

    const findIdQuery = /* GraphQL */
    `{
        findFoodDiaryByID(id: "${foodId}") {
            type
            time
            details
        }
    }`

    return await graphQLClient.request(findIdQuery)
}

export async function foodFeedback(userId) {
    const findIdQuery = /* GraphQL */
    `{
        findId(userId: "${userId}") {
            foodFeedback
        }
    }`

    return await graphQLClient.request(findIdQuery)
}

export async function sessionDataList (userId) {
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

export async function sessionDataById (planId) {
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
              secondary
              video
              units
              datum
              userInputDataId
          }
        }
      } 
    }`
    return await graphQLClient.request(findIdQuery)
}

export async function userDataList(userId) {

    const findIdQuery = /* GraphQL */
    `{
        findId(userId: "${userId}") {
            userData{
                data{
                    _id
                    name
                    customId
                    inputDataUnit
                    inputtedData{
                        sessionId
                        shortTitle
                        datum
                    }
                }
            }
        }
    }`

    return await graphQLClient.request(findIdQuery)
}

export async function userDataById(customDataId) {

    const findIdQuery = /* GraphQL */
    `{
        findUserInput(customId: ${customDataId}) {
            _id
            name
            inputDataUnit
            inputtedData{
                sessionId
                shortTitle
                datum
            }
        }
    }`

    return await graphQLClient.request(findIdQuery)
}

export async function fetchUserList() {
  
    const listUsers = /* GraphQL */
    `{
      allUsers {
        data {
            _id
            userId
            currentSession
        }
      }
    }`
    
    return await graphQLClient.request(listUsers)
}
