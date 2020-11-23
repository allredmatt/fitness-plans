let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function deleteSession (id)  {

    const raw = JSON.stringify({"DeleteId": id});
    
    return sendData("session", "DELETE", raw)
}

export async function updateSession (id, sessionTitle, shortTitle, isCurrent) {

    const raw = JSON.stringify({
        id: id,
        sessionTitle: sessionTitle,
        shortTitle: shortTitle,
        isCurrent: isCurrent
    });

    return sendData("session", "PUT", raw)
}

export async function newSession (userId, sessionTitle, shortTitle, isCurrent) {

    const raw = JSON.stringify({
        userId: userId,
        sessionTitle: sessionTitle,
        shortTitle: shortTitle,
        isCurrent: isCurrent
    });

    return sendData("session", "POST", raw)
}

export async function deleteCard (id)  {

    const raw = JSON.stringify({"DeleteId": id});
    
    return sendData("card", "DELETE", raw)
}

export async function updateCard (id, listOfActivities, inputDataTypes, cardTitle, inputData) {

    const raw = JSON.stringify({
        id: id,
        listOfActivities: listOfActivities,
        inputDataTypes: inputDataTypes,
        cardTitle: cardTitle,
        inputData: inputData,
    });

    return sendData("card", "PUT", raw)
}

export async function newCard (sessionId, listOfActivities, inputDataTypes, cardTitle, inputData) {

    const raw = JSON.stringify({
        listOfActivities: listOfActivities,
        inputDataTypes: inputDataTypes,
        cardTitle: cardTitle,
        inputData: inputData,
        sessionId: sessionId
    });

    return sendData("card", "POST", raw)
}

export async function addRelation (cardId, sessionId, listOfActivities, inputDataTypes, cardTitle, inputData) {

    const raw = JSON.stringify({
        cardId: cardId,
        listOfActivities: listOfActivities,
        inputDataTypes: inputDataTypes,
        cardTitle: cardTitle,
        inputData: inputData,
        sessionId: sessionId
    });

    return sendData("relationship", "POST", raw)
}

export async function deleteRelation (cardId, sessionId, listOfActivities, inputDataTypes, cardTitle, inputData) {

    const raw = JSON.stringify({
        cardId: cardId,
        listOfActivities: listOfActivities,
        inputDataTypes: inputDataTypes,
        cardTitle: cardTitle,
        inputData: inputData,
        sessionId: sessionId
    });

    return sendData("relationship", "DELETE", raw)
}

export async function addUser(userId) {
    const raw = JSON.stringify({userId: userId})

    return sendData("users", "PUT", raw)
}

async function sendData (path, method, raw) {
    const requestOptions = {
            method: method,
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

    let returnData = await fetch("/api/admin/" + path, requestOptions)
    return returnData.json()
}