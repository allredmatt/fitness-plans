const { foodDataList } = require('../../../components/serverGraphQL/query');
const { createFoodData } = require('../../../components/serverGraphQL/mutation')

export default function foodAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    switch (method) {
        case 'GET':
            //If user is dummyData then return some data with todays date and yesterdays date for people to get idea, without having to scroll back through lots of dates.
            if (id === 'dummyUser') {
                const todaysDate = new Date().toISOString().slice(0, 10)
                const tempDate = new Date()
                tempDate.setDate( tempDate.getDate() - 1)
                const yesterdaysDate = new Date(tempDate).toISOString().slice(0, 10)

                const dummyData = [
                    {"_id":"noId1", "type":"Breakfast", "time":`${todaysDate}T08:30:09.304Z`, "details":"Muesli"},
                    {"_id":"noId2", "type":"Lunch",     "time":`${todaysDate}T12:32:00.000Z`, "details":"Jacket potato with tuna mayo"},
                    {"_id":"noId3", "type":"Dinner",    "time":`${todaysDate}T19:40:00.000Z`, "details":"Homemade chicken curry with rice, with salad"},
                    {"_id":"noId4", "type":"Snack",     "time":`${todaysDate}T10:25:00.000Z`, "details":"Apple and yoghurt"},
                    {"_id":"noId5", "type":"Training",  "time":`${todaysDate}T07:33:00.000Z`, "details":"Gym session, rowing and weight training."},
                    {"_id":"noId6", "type":"Notes",     "time":`${todaysDate}T19:30:00.000Z`, "details":"Felt really hungry before dinner time, wanted snack but resisted."},

                    {"_id":"noId7", "type":"Breakfast", "time":`${yesterdaysDate}T08:30:00.000Z`, "details":"2 Weetabix with skimmed milk"},
                    {"_id":"noId8", "type":"Lunch",     "time":`${yesterdaysDate}T13:05:00.000Z`, "details":"Chicken and avocado sandwich"},
                    {"_id":"noId9", "type":"Dinner",    "time":`${yesterdaysDate}T18:50:00.000Z`, "details":"Pasta bolognese with garlic bread"}
                ]
                res.status(200).json(dummyData)
                break
            }
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