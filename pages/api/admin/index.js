const bcrypt = require('bcrypt');
const Cookies = require('cookies')

const ADMIN_HASH = process.env.ADMIN_HASH
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_WORD
const saltRounds = 5

export default function adminAuthAPI (req, res) {
    const { 
        query: {id}, 
        method 
    } = req

    const cookies = new Cookies(req, res)

    switch (method) {
      case 'POST':
              let expireDate = new Date()
              expireDate.setDate(expireDate.getDate() + 7)
              bcrypt.compare(req.body.password, ADMIN_HASH, function(err, result) {
                let newToken = "Not Authorised";
                let error = false
                if(err){error = err}
        
                if(result){
                  bcrypt.hash(ADMIN_TOKEN, saltRounds, function(err, hash) {
                  if(err){error = err}
                    newToken = hash
                    cookies.set('authToken', newToken, {sameSite: 'lax', expires: expireDate})
                    cookies.set('isAuth', true, {sameSite: 'lax', expires: expireDate, httpOnly: false})
                    res.status(200).json({isAuth: result})
                });} else if(error){
                  res.status(400).json({error: error})
                } else {
                  res.status(401).json({isAuth: false})
                }
              });
            break;
      default:
          res.setHeader('Allow', ['POST'])
          res.status(405).end(`Method ${method} Not Allowed`)
    }
}