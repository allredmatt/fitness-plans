const { userDataList } = require('../../../components/serverGraphQL/query');
const { newUserData } = require('../../../components/serverGraphQL/mutation')

export default function userDataAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            userDataList(id)
                .then((data) => res.status(200).json(data.findId.userData.data))
                .catch((error) => res.status(401).json(error))
            break
        case 'POST':
            newUserData(req.body)
                .then((data) => res.status(200).json(data.createUserInputData))
                .catch((error) => res.status(401).json(error))
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}