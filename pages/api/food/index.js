const { foodDataList } = require('../../../components/serverGraphQL/query');
const { createFoodData } = require('../../../components/serverGraphQL/mutation')

export default function foodAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            foodDataList(id)
                .then((data) => res.status(200).json(data.findId.foodDiary.data))
                .catch(() => res.status(401).json({error: "User does not exist"}))
            break
        case 'POST':
            createFoodData(id, req.body)
                .then((data) => res.status(200).json({id: data.createFoodDiary._id}))
                .catch((error) => res.status(401).json({error: error}))
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}