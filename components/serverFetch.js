let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export function getUserDBId (userId) {
    return sendData(`?id=${userId}`, 'GET')
}

export function getUserList () {
    return sendData('admin/users', 'GET')
}

export function getSessionList (userId) {
    return sendData(`session?id=${userId}`, 'GET')
}

export function getFoodList (userId) {
    return sendData(`food?id=${userId}`, 'GET')
} 

export function getInputDataList (userId) {
    return sendData(`data?id=${userId}`, 'GET')
}

export function getSessionById (sessionId) {
    return sendData(`session/${sessionId}`, 'GET')
}

export function getFoodById (foodId) {
    return sendData(`food/${foodId}`, 'GET')
}

export function getInputDataById (dataId) {
    return sendData(`data/${dataId}`, 'GET')
}

export function newUser (newUserName, subsType) {
    const body = {
        userId: newUserName,
        subsType: subsType
    }
    return sendData(`admin/users`, 'POST', body)
}

export function newSession (args) {
    
    return sendData(`/session`, 'POST', args)
}

export function newFood (args) {

    return sendData(`food`, 'POST', args)
}

export function newInputData (args) {

    return sendData(``, 'POST', args)
}

export function modifyFood (id, args) {
    return sendData(`food/${id}`, 'PUT', args)
}

export function modifySession (id, args) {
    return sendData(`session/${id}`, 'PUT', args)
}

export function modifyInputData (id, args) {
    return sendData(`data/${id}`, 'PUT', args)
}

export function modifyUser (id, args) {
    return sendData(`admin/users/${id}`, 'PUT', args)
}

export function changeCurrentSession (user_id, newSessionId) {
    const body = {
        id: user_id,
        newSessionId : newSessionId
    }

    return sendData(``, 'PUT', body)
}

export function deleteSession (sessionId) {
    return sendData(`session/${sessionId}`, 'DELETE')
}

async function sendData (path, method, raw) {
    const requestOptions = {
            method: method,
            headers: myHeaders,
            redirect: 'follow'
        };

    if(raw) {
        requestOptions.body = JSON.stringify(raw)
    }

    let returnData = await fetch("/api/" + path, requestOptions)
    return returnData.json()
}