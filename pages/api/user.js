const { GraphQLClient } = require('graphql-request')
const bcrypt = require('bcrypt');
const Cookies = require('cookies')

const endpoint = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = process.env.FAUNA_KEY
const ADMIN_HASH = process.env.ADMIN_HASH
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_WORD
const saltRounds = 5

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_KEY}`,
  },
});

export default (req, res) => {

  const cookies = new Cookies(req, res)

  let serverData = ""

  async function lookupUserID(user) {
  
    const findIdQuery = /* GraphQL */
    `{
      findId(UserId: "${user}") {
        _id
      }
    }`
    
    serverData = await graphQLClient.request(findIdQuery)
  }

  switch(req.method) {
  case 'GET':
      if(req.query?.id != "null") {
        lookupUserID(req.query?.id)
          .then(() => {
            res.json(serverData)
            res.statusCode = 200
          })
          .catch((error) => {
            res.json({error: error})
            res.statusCode = 400
          })
      } else {
        res.json({error: "No valid UserId sent"})
        res.statusCode = 400
      }
    break;
  case 'POST':
    let expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 7)

    if(req.body.admin === true){
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
    }
    break;
  default:
    console.log("Other of type:", req.method)
    res.statusCode = 400
  }
res.end;
}