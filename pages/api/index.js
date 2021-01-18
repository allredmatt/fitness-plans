const { lookupUserID } = require('../../components/serverGraphQL/query');
const { changeCurrentSession } = require('../../components/serverGraphQL/mutation');

export default function userAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            lookupUserID(id)
                .then((data) => res.status(200).json(data.findId))
                .catch(() => res.status(401).json({error: "User does not exist"}))
            break
        case 'PUT':
            changeCurrentSession(req.body.id, req.body.newSessionId)
                .then((data) => res.status(200).json(data))
                .catch((error) => res.status(401).json(error))
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}