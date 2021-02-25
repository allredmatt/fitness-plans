const { foodDataById } = require('../../../components/serverGraphQL/query');
const { modifyFoodDataById, deleteFoodDataById } = require('../../../components/serverGraphQL/mutation');

export default function userAPI (req, res) {
    const { 
        query: {foodId}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            foodDataById(foodId)
                .then((data) => res.status(200).json(data.findFoodDiaryByID))
                .catch((error) => res.status(401).json({error: error}))
            break
        case 'PUT':
            modifyFoodDataById(foodId, req.body)
                .then((data) => res.status(200).json({id: data.updateFoodDiary._id}))
                .catch((error) => res.status(401).json({error: error}))
            break
        case 'DELETE':
            deleteFoodDataById(foodId)
                .then((data) => res.status(200).json({deleted: foodId}))
                .catch((error) => res.status(401).json({error: error}))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}