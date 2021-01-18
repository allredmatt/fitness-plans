const { GraphQLClient } = require('graphql-request')
const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export async function modifyFoodDataById(foodId, foodData) {
  
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
    "id": foodId,
    "type": foodData.type,
    "time": foodData.time,
    "details": foodData.details
    }
    return await graphQLClient.request(mutation, variables);
}

export async function deleteFoodDataById(id) {
  
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
    
    return await graphQLClient.request(mutation, variables);
}

export async function createFoodData(foodData) {
  
    const mutation = /* GraphQL */ `
    mutation createFoodDiary($id: ID!, $type: String!, $time: Int!, $details: String!) {
        createFoodDiary(
            data:{
                type: $type,
                time: $time,
                details: $details,
                userId:{
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

export async function modifySessionById(sessionId, sessionData) {
  const mutation = /* GraphQL */ `
  mutation updateFitPlan(
    $id: ID!
    $sessionTitle: String!,
    $shortTitle: String!,
    $rating: Int,
    $notes: String,
    $cardInfo: [CardInfoInput]!
    ) {
      updateFitPlan(
          id: $id
          data:{
            sessionTitle: $sessionTitle,
            shortTitle: $shortTitle,
            rating: $rating,
            notes: $notes,
            cardInfo: $cardInfo
          }
      ) {
      _id
      }
    }
  `
  const variables = {
    "id": sessionId,
    "sessionTitle": sessionData.sessionTitle,
    "shortTitle": sessionData.shortTitle,
    "rating": sessionData.rating,
    "notes": sessionData.notes,
    "cardInfo": sessionData.cardInfo
  }
  return await graphQLClient.request(mutation, variables);
}

export async function deleteSession(sessionId) {
  const mutation = /* GraphQL */ `
  mutation deleteFitPlan($id: ID!) {
      deleteFitPlan(
          id: $id
      ) {
      _id
      }
    }
  `
  const variables = {
  "id": sessionId
  }
  
  return await graphQLClient.request(mutation, variables);
}

export async function newSession(sessionData) {
  const mutation = /* GraphQL */ `
  mutation newFitPlan(
    $userId: ID!,
    $sessionTitle: String!,
    $shortTitle: String!,
    $rating: Int,
    $notes: String,
    $cardInfo: [CardInfoInput]!
    ) {
      createFitPlan(
          data:{
            userId: {connect: userId},
            sessionTitle: sessionTitle,
            shortTitle: shortTitle,
            rating: rating,
            notes: notes,
            cardInfo: cardInfo
          }
      ) {
      _id
      }
    }
  `
  const variables = {
    "userId": sessionData.user_id,
    "shortTitle": sessionData.shortTitle,
    "rating": sessionData.rating,
    "notes": sessionData.notes,
    "cardInfo": sessionData.cardInfo
  }
  return await graphQLClient.request(mutation, variables);
}

export async function addUser(userId, subscriptionType) {
  
  const mutation = /* GraphQL */ `
  mutation createUser($userId: String!, subscriptionType: String!) {
      createUser(
          data: {
            userId: $userId,
            subscriptionType: $subscriptionType
            }
      ) {
      _id
      }
    }
  `
  const variables = {
  "userId": userId,
  "subscriptionType": subscriptionType
  }
  
  return await graphQLClient.request(mutation, variables);
}

export async function newUserData(inputData) {
  
  const mutation = /* GraphQL */ `
  mutation createUser($userId: String!, subscriptionType: String!) {
      createUserInputData(
          data: {
            userId: $userId,
            name: $name,
            inputDataUnit: $inputDataUnit,
            }
      ) {
      _id
      }
    }
  `
  const variables = {
  "userId": inputData.userId,
  "name": inputData.name,
  "userInputUnit": inputData.unit
  }
  
  return await graphQLClient.request(mutation, variables);
}

export async function deleteUserData(userDataId) {
  const mutation = /* GraphQL */ `
  mutation deleteUserInputData($id: ID!) {
    deleteUserInputData(
          id: $id
      ) {
      _id
      }
    }
  `
  const variables = {
  "id": sessionId
  }
  
  return await graphQLClient.request(mutation, variables);
}

export async function modifyUserData(dataId, userInputData) {
  const mutation = /* GraphQL */ `
    mutation updateUserInputData($id: ID!, $name: String!, $inputDataUnit: String!, $inputtedData: [UserData], $userId: User!) {
      updateUserInputData(
            id: $id
            data:{
                name: $name,
                inputDataUnit: $inputDataUnit,
                inputtedData: $inputtedData,
                userId: $userId
            }
        ) {
        _id
        }
      }
    `
    const variables = {
    "id": dataId,
    "name": userInputData.name,
    "inputDataUnit": userInputData.inputDataUnit,
    "inputtedData": userInputData.inputtedData,
    "userId": userInputData.userId
    }
    return await graphQLClient.request(mutation, variables);
}

export async function modifyUser (user_id, userData) {
  const mutation = /* GraphQL */ `
    mutation updateUserInputData($id: ID!, $userId: String!, $subscriptionType: String!, $currentSession: String) {
    updateUser(
          id: $id
          data:{
              userId: $userId,
              subscriptionType: $subscriptionType,
              currentSession: $currentSession
          }
      ) {
      _id
      }
    }
  `
  const variables = {
  "id": user_id,
  "userId": userData.userId,
  "subscriptionType": userData.subscriptionType,
  "currentSession": userData.currentSession
  }
  return await graphQLClient.request(mutation, variables);
}

export async function changeCurrentSession (user_id, newSessionId) {
  const findUserByID = /* GraphQL */
  `{
      findUserByID(id: "${user_id}") {
        userId
        subscriptionType
      }
  }`

  let data = await graphQLClient.request(findIdQuery)
  console.log({...data.findUserByID, currentSession: newSessionId})
  return modifyUser(user_id, {...data.findUserByID, currentSession: newSessionId})

}