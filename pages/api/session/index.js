const { sessionDataList } = require('../../../components/serverGraphQL/query');
const { newSession } = require('../../../components/serverGraphQL/mutation')

export default function sessionAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            sessionDataList(id)
                .then((data) => res.status(200).json(data.findId.fitnessPlan.data))
                .catch(() => res.status(401).json({error: "User does not exist"}))
            break
        case 'POST':
            newSession(req.body)
                .then((data) => res.status(200).json(data))
                .catch(() => res.status(401).json({error: "User does not exist"}))
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}