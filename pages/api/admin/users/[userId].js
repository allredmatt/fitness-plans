const { modifyUser } = require('../../../../components/serverGraphQL/mutation')

const bcrypt = require('bcrypt');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_WORD

export default function adminUsersAPI (req, res) {
    const { 
        query: {user_id}, 
        method 
    } = req

    bcrypt.compare(ADMIN_TOKEN, req.cookies.authToken, function(err, result) {
        if(result) {
            switch (method) {
                case 'POST':
                    modifyUser(user_id, req.body)
                        .then((data) => res.status(200).json(data))
                        .catch((error) => res.status(401).json({error: error}))
                    break
                default:
                    res.setHeader('Allow', ['POST', 'DELETE'])
                    res.status(405).end(`Method ${method} Not Allowed`)
            }   
        } else res.status(401).json({error: "You are not authorised to access this end point."})
    })
}