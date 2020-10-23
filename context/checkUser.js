import {useState, useEffect, createContext} from 'react'



function useUser (userNameParam) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState(null)
    const [userId, setUserId] = useState()

    useEffect(() => {
        if(localStorage.getItem('UserId') ){
        setUserName(localStorage.getItem('UserId'))
        }
    }, [])

    useEffect(()=> {
        if(userName){
        fetch(`/api/user?id=${userName}`,)
            .then(response => response.json())
            .then(data => {
                setIsLoggedIn(true)
                setUserId(data.findId?._id)
            })
        } else {
            setIsLoggedIn(false)
            setUserId('')
        }
    }, [userName]);
    
    
    let user =  {isLoggedIn: isLoggedIn, name: userName, id: userId, setUserName: setUserName}

    return user
}

const userContext = createContext({isLoggedIn: false, name: null, id: null})

export {
    useUser,
    userContext
};