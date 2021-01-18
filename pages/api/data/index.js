const { userDataList } = require('../../../components/serverGraphQL/query');

export default function userDataAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            userDataList(id)
                .then((data) => res.status(200).json(data.findId.userData.data))
                .catch(() => res.status(401).json({error: "User does not exist"}))
            break
        case 'POST':
            newUserData(req.body)
                .then((data) => res.status(200).json(data))
                .catch(() => res.status(401).json({error: "User does not exist"}))
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}