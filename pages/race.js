import { useState, useEffect } from "react"
import { GraphQLClient } from 'graphql-request'
import { getFoodList }  from '../components/serverFetch'


export default function Race () {

    const [server, setServer] = useState('loading from server')
    const [fauna, setFauna] = useState('loading direct from fauna')

    

    useEffect(()=> {
        getFoodList('matthew')
        .then((data) => setServer(data[0].type))

        foodDataList('matthew')
        .then((data) => setFauna(data.findId.foodDiary.data[0].type))

    }, [])

    return(
        <div>
            {server}
            <br />
            {fauna}
        </div>
    )
}

async function foodDataList(userId) {

    const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
        headers: {
            authorization: `Bearer fnAEH-QVdkACAZ4OYBSDJrmqTRfA2x3wgru_7UiN`,
        },
    });
    //This bearer code is only live for 5 mins to run the test. Will be deleted on server and won't work 

    const findIdQuery = /* GraphQL */
    `{
        findId(userId: "${userId}") {
        foodDiary{
            data{
                _id
                type
                time
                details
            }
        }
        }
    }`

    return await graphQLClient.request(findIdQuery)
}