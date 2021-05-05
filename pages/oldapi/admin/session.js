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

    async function deleteSession(sessionId) {
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
        
        const data = await graphQLClient.request(mutation, variables);
        return data
    }

    async function newSession(props) {
        const mutation = /* GraphQL */ `
        mutation createFitPlan($userId: ID!, $shortTitle: String!, $isCurrent: Boolean!, $sessionTitle: String!) {
            createFitPlan(
                data:{
                    shortTitle: $shortTitle,
                    isCurrent: $isCurrent,
                    sessionTitle: $sessionTitle,
                    UserId:{
                        connect: $userId
                    }
                }
            ) {
            _id
            }
        }
        `
        const variables = {...props}
        const data = await graphQLClient.request(mutation, variables);
        console.log(data)
        return data
    }

    async function updateSession(props) {
        const mutation = /* GraphQL */ `
        mutation updateFitPlan($id: ID!, $shortTitle: String!, $isCurrent: Boolean!, $sessionTitle: String!) {
            updateFitPlan(
                id: $id
                data:{
                    shortTitle: $shortTitle,
                    isCurrent: $isCurrent,
                    sessionTitle: $sessionTitle,
                }
            ) {
            _id
            }
        }
        `
        const variables = { ...props }
        console.log(variables)
        const data = await graphQLClient.request(mutation, variables);
        return data
    }

    bcrypt.compare(ADMIN_TOKEN, req.cookies.authToken, function(err, result) {
        if(result) {
            switch(req.method) {
                case 'DELETE':
                    deleteSession(req.body.DeleteId)
                        .then((data) => res.status(200).json({id: data.deleteFitPlan._id}))
                        .catch((data) => res.status(400).json({error: data}))
                    break;
                case 'POST':
                    newSession(req.body)
                        .then((data) => res.status(200).json({id: data.createFitPlan._id}))
                        .catch((data) => res.status(400).json({error: data}))
                break;
                case 'PUT':
                    updateSession(req.body)
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