import { useState, useEffect }  from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import Paper                    from '@material-ui/core/Paper';
import SkipPreviousIcon         from '@material-ui/icons/SkipPrevious';
import SkipNextIcon             from '@material-ui/icons/SkipNext';
import IconButton               from '@material-ui/core/IconButton';
import Tooltip                  from '@material-ui/core/Tooltip';
import Divider                  from '@material-ui/core/Divider';
import List                     from '@material-ui/core/List';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon             from '@material-ui/core/ListItemIcon';
import ListItemText             from '@material-ui/core/ListItemText';
import YouTubeIcon              from '@material-ui/icons/YouTube';
import useMediaQuery            from '@material-ui/core/useMediaQuery';
import Button                   from '@material-ui/core/Button';
import CheckCircleTwoToneIcon   from '@material-ui/icons/CheckCircleTwoTone';
import CardActions              from '@material-ui/core/CardActions';
import TextField                from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';



export default function FitnessPlan ({fitnessData}) {

    const minWidth700 = useMediaQuery('(min-width:700px)');
    
    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: theme.palette.background.paper,
            margin: theme.spacing(1),
            
        },
        paper: {
            padding: theme.spacing(2),  
        },
        root: {
            width: '100%',
        },
        flexDiv:{
            display: 'flex',
            flexDirection: minWidth700? "row" : "column",
            minWidth: '180px'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        listRoot: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
        },
        listItem:{
            marginLeft: '4px'
        },
        inline: {
            display: 'inline',
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        textField: {
            width: '25ch',
        }
    }));

    const classes = useStyles();
    const [indexToBeDisplayed, setIndexToBeDisplayed] = useState(0)
    const [userInputData, setUserInputData] = useState()
    const [filteredFitnessData, setFilteredFitnessData] = useState()


    useEffect(()=> {
        let indexToUse = fitnessData?.findIndex((element) => element.isCurrent)
        indexToUse = indexToUse === -1? 0 : indexToUse
        setIndexToBeDisplayed(indexToUse)
    }, [fitnessData])

    useEffect(() => {
        setFilteredFitnessData(fitnessData?.[indexToBeDisplayed])
    }, [indexToBeDisplayed, fitnessData])
    
    useEffect(() => {
        let initUserInputData = []
    
        if(filteredFitnessData) {
            const sessionId = filteredFitnessData.id
            initUserInputData = filteredFitnessData.cardInfo?.map((element) => {
                if (element.inputData === null) {
                    if(element.inputDataTypes.length === 0) {
                        return {fitPlanId: sessionId, isSubmitted: false}
                    } else {
                        let returnedObject = {fitPlanId: sessionId, isSubmitted: false}
                        element.inputDataTypes.forEach(unit => returnedObject[unit] = "")
                        return returnedObject
                    }
                } else {
                    const currentUserData = JSON.parse(element.inputData)
                    const currentSessionData = currentUserData.find((element) => element.fitPlanId === sessionId)
                    if(currentSessionData) {
                        return currentSessionData
                    } else {
                        if(element.inputDataTypes.length === 0) {
                            return {fitPlanId: sessionId, isSubmitted: false}
                        } else {
                            let returnedObject = {fitPlanId: sessionId, isSubmitted: false}
                            element.inputDataTypes.forEach(unit => returnedObject[unit] = "")
                            return returnedObject
                        }
                    }
                }
            })
        }
        setUserInputData(initUserInputData)
    }, [filteredFitnessData])

    
     
    const handleNextClick = () => {
        setIndexToBeDisplayed(fitnessData.length === (indexToBeDisplayed + 1) ? indexToBeDisplayed : indexToBeDisplayed + 1)
    }
    
    const handlePreviousClick = () => {
        setIndexToBeDisplayed((indexToBeDisplayed - 1) === -1 ? 0 : indexToBeDisplayed - 1)
    }

    const handleFinishedClick = (index) => {
        //Change the local state:
        let tempUserData = [...userInputData]
        tempUserData[index].isSubmitted = true
        setUserInputData(tempUserData)

        //Upload changes to server 
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const currentCard = filteredFitnessData.cardInfo[index] //selects just the card that was clicked
        let newInputData = currentCard.inputData? JSON.parse(currentCard.inputData) : []
        const cardIndex = newInputData.findIndex((element) => element.fitPlanId === filteredFitnessData.id) //Looks to see if the id for that session already exists in card data
        if(cardIndex === -1) {
            newInputData.push(tempUserData[index])
        } else {
            newInputData[cardIndex] = tempUserData[index]
        }

        const body = {
            type: "card",
            id: currentCard._id,
            cardTitle: currentCard.cardTitle,
            inputDataTypes: currentCard.inputDataTypes,
            listOfActivities: currentCard.listOfActivities,
            inputData: JSON.stringify(newInputData),
        }
    
        const raw = JSON.stringify(body);

        const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/api/fit", requestOptions)
            .then(data => console.log("Uploaded new data to server", data))
            .catch(error => console.log('error', error));
        
        //Check to see if all the parts of this session are complete and if so change current session on server.
        //Will leave this as current session in local state as unlikely to want to move to next session straight away.
        if(tempUserData.reduce((acc, curr) => acc && curr.isSubmitted)){
            //server wants oldCurrent.id and .title along with newCurrent.id and .title in body of post method PUT
            let newCurrent = {}
            if(fitnessData.length === (indexToBeDisplayed + 1)) {
                //Already at end of sessions add alert to user that they have finished
                newCurrent =  {
                        id: fitnessData[0].id,
                        title: fitnessData[0].sessionTitle
                    }
            } else {
                newCurrent = {
                        id: fitnessData[indexToBeDisplayed + 1].id,
                        title: fitnessData[indexToBeDisplayed + 1].sessionTitle
                }
            }

            let body = {
                    type: "plan",
                    oldCurrent: {
                        id: filteredFitnessData.id,
                        title: filteredFitnessData.sessionTitle
                    },
                    newCurrent: newCurrent
            }
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify(body);
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/fit", requestOptions)
                .then(data => console.log("Changed current session", data))
                .catch(error => console.log('error', error));
        }
    }

    const handleUserDataChange = (event, index, element) => {
        let newDataObject = {...userInputData[index]}
        newDataObject[element] = event.target.value
        let newUserDataArray = [...userInputData]
        newUserDataArray[index] = newDataObject
        setUserInputData(newUserDataArray)
    }
    
    if(filteredFitnessData){
        return(
            
            <div className={classes.root}>
            <Paper className={classes.paper} elevation={2}>
                    <Typography gutterBottom variant="h5" component="h2">
                            Fitness Plan
                    </Typography>
                    <div className={classes.controls}>
                        <Tooltip title="Previous workout" aria-label="previous">
                            <IconButton aria-label="previous" onClick={handlePreviousClick}>
                                <SkipPreviousIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h6" component="h3">
                            {filteredFitnessData.sessionTitle}
                        </Typography>
                        <Tooltip title="Next workout" aria-label="next">
                            <IconButton aria-label="next" onClick={handleNextClick}>
                                <SkipNextIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                <div className={classes.flexDiv}>
                {filteredFitnessData.cardInfo?.map((cardData, index) => 
                    <Card className={classes.card} key={cardData._id}>
                        <CardContent >
                            <Typography variant="subtitle2" component="span" >
                                {cardData.cardTitle}
                            </Typography>
                            <List className={classes.listRoot}>
                                    {cardData.listOfActivities.map((activityString, index) => {
                                        let activity = JSON.parse(activityString)
                                        return( 
                                        <ListItem key ={"listKey"+index}>
                                            <ListItemText
                                            className={classes.listItem}
                                            primary={activity.primary}
                                            secondary={activity.secondary}
                                            />
                                            {Boolean(activity.video) && 
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="youtube-link" target="_blank" href={activity.video}>
                                                <YouTubeIcon  />
                                                </IconButton>
                                            </ListItemSecondaryAction>}
                                        </ListItem>
                                        )
                                    })}
                            </List>
                            {Boolean(cardData.inputDataTypes) &&
                            <React.Fragment>
                            <Divider />
                            <List>
                                {cardData.inputDataTypes.map((element) => 
                                <ListItem>
                                    <TextField
                                        label="Your workout"
                                        id="outlined-start-adornment"
                                        className={classes.textField}
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{element}</InputAdornment>,
                                        }}
                                        variant="outlined"
                                        value={userInputData?.[index]?.[element]}
                                        onChange={(event) => handleUserDataChange(event, index, element)}
                                        />
                                </ListItem>)}
                            </List>
                            </React.Fragment>
                            }
                            <CardActions>
                                {userInputData?.[index]?.isSubmitted? 
                                    <CheckCircleTwoToneIcon color="primary"/>
                                    :
                                    <Button 
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        onClick={()=> handleFinishedClick(index)}
                                    >
                                        {cardData?.inputDataTypes.length === 0? "Finished" : "Submit"}
                                    </Button>}
                            </CardActions>
                        </CardContent>
                    </Card>
                )}
                </div>
            </Paper>
        </div>)
    } else {return null}
}