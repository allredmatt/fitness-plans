const { sessionDataById } = require('../../../components/serverGraphQL/query');
const { modifySessionById, deleteSession } = require('../../../components/serverGraphQL/mutation');

export default function sessionAPI (req, res) {
    const { 
        query: {session}, 
        method 
    } = req

    const sessionId = session[0]
    switch (method) {
        case 'GET':
            sessionDataById(sessionId)
                .then((data) => res.status(200).json(session[1] === 'cards'? data.findFitPlanByID.cardInfo : data.findFitPlanByID))
                .catch(() => res.status(401).json({error: "No session data with ID given"}))
            break
        case 'PUT':
            modifySessionById(sessionId, req.body)
                .then((data) => res.status(200).json(data))
                .catch((error) => res.status(401).json(error))
            break
        case 'DELETE':
            deleteSession(sessionId)
                .then((data) => res.status(200).json(data))
                .catch(() => res.status(401).json({error: "No session data with ID given"}))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}