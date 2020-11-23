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

    async function deleteCard(cardId) {
        const mutation = /* GraphQL */ `
        mutation deleteCardInfo($id: ID!) {
            deleteCardInfo(
                id: $id
            ) {
            _id
            }
          }
        `
        const variables = {
        "id": cardId
        }
        
        const data = await graphQLClient.request(mutation, variables);
        return data
    }

    async function newCard(props) {
        const mutation = /* GraphQL */ `
        mutation createCardInfo($sessionId: ID!, $listOfActivities: [String]!, $inputDataTypes: [String], $cardTitle: String!, $inputData: String ) {
            createCardInfo(
                data:{
                    listOfActivities: $listOfActivities,
                    inputDataTypes: $inputDataTypes,
                    cardTitle: $cardTitle,
                    inputData: $inputData,
                    FitPlanId:{
                        connect: [$sessionId]
                    }
                }
            ) {
            _id
            }
        }
        `
        const variables = {...props}
            
        const data = await graphQLClient.request(mutation, variables);
        return data
    }

    async function updateCard(props) {
        const mutation = /* GraphQL */ `
        mutation updateCardInfo($id: ID!, $listOfActivities: [String]!, $inputDataTypes: [String], $cardTitle: String!, $inputData: String ) {
            updateCardInfo(
                id: $id
                data:{
                    listOfActivities: $listOfActivities,
                    inputDataTypes: $inputDataTypes,
                    cardTitle: $cardTitle,
                    inputData: $inputData,
                }
            ) {
            _id
            }
        }
        `
        const variables = {...props}
            
        const data = await graphQLClient.request(mutation, variables);
        return data
    }

    bcrypt.compare(ADMIN_TOKEN, req.cookies.authToken, function(err, result) {
        if(result) {
            switch(req.method) {
                case 'DELETE':
                    deleteCard(req.body.cardId)
                        .then((data) => res.status(200).json({id: data.deleteCardInfo._id}))
                        .catch((data) => res.status(400).json({error: data}))
                    break;
                case 'POST':
                    newCard(req.body)
                        .then((data) => res.status(200).json({id: data.createCardInfo.ADMIN_TOKEN_WORD}))
                        .catch((data) => res.status(400).json({error: data}))
                break;
                case 'PUT':
                    updateCard(req.body)
                        .then((data) => res.status(200).json(data))
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