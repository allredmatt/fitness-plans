const { foodFeedback } = require('../../components/serverGraphQL/query');
const { modifyFoodFeedback } = require('../../components/serverGraphQL/mutation');

export default function userAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            foodFeedback(id)
                .then((data) => res.status(200).json(data.findId))
                .catch((error) => res.status(401).json({error: error}))
            break
        case 'PUT':
            modifyFoodFeedback(id, req.body.link)
                .then((data) => res.status(200).json(data))
                .catch((error) => res.status(401).json(error))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}