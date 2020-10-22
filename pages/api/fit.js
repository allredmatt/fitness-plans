const { GraphQLClient } = require('graphql-request')
const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export default (req, res) => {
    
    async function modifyCardData(cardData) {

    const mutation = /* GraphQL */ `
    mutation updateCardInfo($id: ID!, $cardTitle: String!, $inputDataTypes: [String], $listOfActivities: [String]!, $inputData: String) {
        updateCardInfo(
            id: $id
            data:{
                cardTitle: $cardTitle,
                inputDataTypes: $inputDataTypes,
                listOfActivities: $listOfActivities,
                inputData: $inputData,
            }
        ) {
        _id
        }
      }
    `
    const variables = {
        "id": cardData.id,
        "cardTitle": cardData.cardTitle,
        "inputDataTypes": cardData.inputDataTypes,
        "listOfActivities": cardData.listOfActivities,
        "inputData": cardData.inputData,
    }
    const data = await graphQLClient.request(mutation, variables);
    return data
  }

  async function modifyPlanData(planData) {

    const mutation = /* GraphQL */ `
    mutation updateFitPlan($id: ID!, $isCurrent: Boolean!, $sessionTitle: String!) {
        updateFitPlan(
            id: $id
            data:{
                isCurrent: $isCurrent,
                sessionTitle: $sessionTitle,
            }
        ) {
        _id
        }
      }
    `
    const variables1 = {
      "id": planData.newCurrent.id,
      "isCurrent": true,
      "sessionTitle": planData.newCurrent.title
    }

    const variables2 = {
      "id": planData.oldCurrent.id,
        "isCurrent": false,
        "sessionTitle": planData.oldCurrent.title
    }

    const dataNew = await graphQLClient.request(mutation, variables1);
    console.log(dataNew)
    const dataOld = await graphQLClient.request(mutation, variables2);
    console.log(dataOld)
    return {old: dataOld, new: dataNew}
  }

  switch(req.method) {
  /*case 'GET':
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
*/
  case 'PUT':
    if (req.body.type === "card"){
      modifyCardData(req.body)
      .then((data) => res.status(200).json({id: data.updateCardInfo._id}))
      .catch((data) => res.status(400).json({error: data}))
    } else if (req.body.type === "plan") {
      modifyPlanData(req.body)
      .then((data) => res.status(200).json(data))
      .catch((data) => res.status(400).json({error: data}))
    } else {
      res.status(400).json({error: "Invalid use in body.type. Must use plan or card"})
    }
    break;

/*  case 'DELETE':
    console.log("Delete: ", req.body)
    deleteFoodData(req.body.DeleteId)
    .then((data) => res.status(200).json({id: data.deleteFoodDiary._id}))
    .catch((data) => res.status(400).json({error: data}))
    break;*/

  default:
    console.log("Other of type:", req.method)
    res.statusCode = 400
  }
res.end;
}