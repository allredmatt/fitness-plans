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

    async function addRelation(props) {
        const mutation = /* GraphQL */ `
        mutation updateCardInfo($cardId: ID!, $sessionId: ID!, $listOfActivities: [String]!, $inputDataTypes: [String], $cardTitle: String!, $inputData: String ) {
            updateCardInfo(
                id: $cardId
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

    async function deleteRelation(props) {
        const mutation = /* GraphQL */ `
        mutation updateCardInfo($cardId: ID!, $sessionId: ID!, $listOfActivities: [String]!, $inputDataTypes: [String], $cardTitle: String!, $inputData: String ) {
            updateCardInfo(
                id: $cardId
                data:{
                    listOfActivities: $listOfActivities,
                    inputDataTypes: $inputDataTypes,
                    cardTitle: $cardTitle,
                    inputData: $inputData,
                    FitPlanId:{
                        disconnect: [$sessionId]
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

    bcrypt.compare(ADMIN_TOKEN, req.cookies.authToken, function(err, result) {
        if(result) {
            
            switch(req.method) {
                case 'DELETE':
                    deleteRelation(req.body)
                        .then((data) => res.status(200).json({data: data}))
                        .catch((data) => res.status(400).json({error: data}))
                    break;
                case 'POST':
                    addRelation(req.body)
                        .then((data) => res.status(200).json({data: data}))
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