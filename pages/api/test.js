const { GraphQLClient } = require('graphql-request')
const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export default (req, res) => {

    let rating = 5
    let activity = [
        {
        primary: "Run",
        secondary: "as fast as you can boyo",
        units: [
            "km"
        ],
        datum: [
            4.5
        ],
        userInputDataId: [
            "287419154513789447"
        ]
    }
    ]

    const mutation = `
    mutation UpdateFitPlan{
        updateFitPlan(
            id: 287419154519032327,
            data:{
            rating: ${rating},
            notes: "Really hard",
            shortTitle: "D1",
            sessionTitle: "Day 1",
            cardInfo: [
                {
                cardTitle: "Card Title",
                listOfActivities: ${JSON.stringify(activity)}
                    }
                
            ]
            })
            {
        _id
            }
        }
    `
  
  graphQLClient.request(mutation)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error))
}