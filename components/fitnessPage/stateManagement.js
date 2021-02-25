import { blankCardInfo, blankActivity } from '../admin/fitnessDisplay'

export function handleCardStateChange ({newValue, activityIndex, cardIndex, changeType}, currentSessionInfo, setCurrentSessionInfo) {
    //called args would look something look this: {newValue: event.target.value, activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "primary", object: "activity"}}
    //add a hasChanged flag so can check for saving
    if(changeType.object === 'cardInfo'){
        switch(changeType.key) {
            case 'delete':
                setCurrentSessionInfo({
                    ...currentSessionInfo,
                    hasChanged: true, 
                    cardInfo: currentSessionInfo.cardInfo.filter((card, index) => index != cardIndex)
                })
                break
            case 'new':
                setCurrentSessionInfo({
                    ...currentSessionInfo,
                    hasChanged: true, 
                    cardInfo: currentSessionInfo.cardInfo.concat(blankCardInfo())
                })
                break
            default:
                setCurrentSessionInfo({
                    ...currentSessionInfo, 
                    hasChanged: true,
                    cardInfo: currentSessionInfo.cardInfo.map((card, index) => index === cardIndex? {...card, [changeType.key]: newValue } : card)
                })
        }
    } else { //Only other changes are to activity
        let newActivityArray = []
        switch(changeType.key){
            case 'delete':
                newActivityArray = currentSessionInfo.cardInfo[cardIndex].listOfActivities.filter((activity, index) => index != activityIndex)
                //filter out the activity to delete
                break
            case 'new':
                newActivityArray = currentSessionInfo.cardInfo[cardIndex].listOfActivities.concat(blankActivity())
                //add a blank activity to end of array
                break
            case 'units':
                newActivityArray = [...currentSessionInfo.cardInfo[cardIndex].listOfActivities]
                newActivityArray[activityIndex].units.push(newValue.unit)
                newActivityArray[activityIndex].userInputDataId.push(newValue.id)
                newActivityArray[activityIndex].datum.push(0)
                break
            default:
                newActivityArray = currentSessionInfo.cardInfo[cardIndex].listOfActivities.map((activity, index) => index === activityIndex ? {...activity, [changeType.key]: newValue } : activity)
                //change the key to new value for the activity with correct index
        }
        //Use current function called again with card changes to the listOfActivities key to implement activity change.
        handleCardStateChange(
            {
                newValue: newActivityArray,
                cardIndex: cardIndex,
                changeType: {
                    key: 'listOfActivities',
                    object: 'cardInfo',
                }
            },
            currentSessionInfo,
            setCurrentSessionInfo
        )
    }
}