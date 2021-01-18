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
                .catch(() => res.status(401).json({error: "No food data with ID given"}))
            break
        case 'PUT':
            modifyFoodDataById(foodId, req.body)
                .then((data) => res.status(200).json({id: data.updateFoodDiary._id}))
                .catch(() => res.status(401).json({error: "No food data with ID given"}))
            break
        case 'DELETE':
            deleteFoodDataById(foodId)
                .then((data) => res.status(200).json({deleted: foodId}))
                .catch(() => res.status(401).json({error: "No food data with ID given"}))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}