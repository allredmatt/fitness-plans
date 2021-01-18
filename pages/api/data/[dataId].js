const { userDataById } = require('../../../components/serverGraphQL/query');
const { modifyUserData, deleteUserData } = require('../../../components/serverGraphQL/mutation');

export default function userAPI (req, res) {
    const { 
        query: {dataId}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            userDataById(dataId)
                .then((data) => res.status(200).json(data))
                .catch(() => res.status(401).json({error: "No user data with ID given"}))
            break
        case 'PUT':
            modifyUserData(dataId, req.body)
                .then((data) => res.status(200).json(data))
                .catch(() => res.status(401).json({error: "No user data with ID given"}))
            break
        case 'DELETE':
            deleteUserData(dataId)
                .then((data) => res.status(200).json({deleted: dataId}))
                .catch(() => res.status(401).json({error: "No user data with ID given"}))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}