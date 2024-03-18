const { lookupUserID } = require('../../components/serverGraphQL/query');
const { changeCurrentSession } = require('../../components/serverGraphQL/mutation');

export default async function userAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            lookupUserID(id)
                .then((data) => {
                    res.status(200).json(data).end()
                })
                .catch((data) => {
                    res.status(401).json({error: "User does not exist", data: data}).end()
                })
            break
        case 'PUT':
            changeCurrentSession(req.body.id, req.body.newSessionId)
                .then((data) => res.status(200).json(data)).end()
                .catch((error) => res.status(401).json(error)).end()
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    
}