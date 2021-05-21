import { useState, useEffect, useLayoutEffect }  from 'react';
import { makeStyles, withStyles }                from '@material-ui/core/styles';
import UserFitnessPlan                           from '../fitnessPage/userFit'
import * as serverFetch                          from '../../components/serverFetch'
import ModifySessionCard                         from './modifySessionCard'
import ModifySessionInfo                         from './modifySessionInfo'
import Typography                                from '@material-ui/core/Typography';
import Button                                    from '@material-ui/core/Button';
import Paper                                     from '@material-ui/core/Paper';
import Grid                                      from '@material-ui/core/Grid'
import Tabs                                      from '@material-ui/core/Tabs';
import Tab                                       from '@material-ui/core/Tab';
import Dialog                                    from '@material-ui/core/Dialog';
import DialogActions                             from '@material-ui/core/DialogActions';
import DialogContent                             from '@material-ui/core/DialogContent';
import DialogContentText                         from '@material-ui/core/DialogContentText';
import DialogTitle                               from '@material-ui/core/DialogTitle';
import { handleCardStateChange }                 from '../../components/fitnessPage/stateManagement'
import List                                      from '@material-ui/core/List'
import ListItem                                  from '@material-ui/core/ListItem'


const useStyles = makeStyles((theme) => ({
    gridPaper:{
        padding: theme.spacing(1),
        height: "100%",
        backgroundColor: theme.palette.primary.main
    },
    gridRoot: {
        flexGrow: 1,
        width: '100%',
      },
    gridItem:{
        marginBottom: theme.spacing(1),
    },
    gridItemFlex:{
        display: "flex",
        marginBottom: theme.spacing(1),
    },
    bottomMargin:{
        marginBottom: theme.spacing(2),
    },
    textArea:{
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    cardPaper:{
        display: "flex",
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.highlighted
    },
    typographyPad:{
        padding: theme.spacing(1),
    },
    rightAlign:{
        marginLeft: "auto"
    },
    span:{
        display: 'flex',
        alignItems: 'baseline'
    },
    selfAlign:{
        marginLeft: 'auto'
    }
}));

const blankSession = {
    _id: "noIdYet",
    sessionTitle: "New Session",
    shortTitle: "New",
    isNew: true,
    isBlank: true
}
export const blankActivity = () => [{primary: "Activity Name", secondary: "Details here...", userInputDataId: new Array(1), units: new Array(1), datum:new Array(1)}]
export const blankCardInfo = () => [{cardTitle: "Title", listOfActivities: [{primary: "Activity Name", secondary: "Details here...", userInputDataId: new Array(1), units: new Array(1), datum: new Array(1)}]}]

export default function FitDisplay ({sessionServerData, setSessionServerData, user, setIsBackDropOpen, startAtEnd = false}) {

    const classes = useStyles();

    const [currentIndex, setCurrentIndex] = useState(startAtEnd? sessionServerData.length - 1: 0)
    const [currentSessionInfo, setCurrentSessionInfo] = useState(sessionServerData[sessionServerData.length - 1])
    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false)
    const [isNewSessionPopUpOpen, setIsNewSessionPopUpOpen] = useState(false)
    const [userDataTracking, setUserDataTracking] = useState([])
    const [shouldBeActiveSession, setShouldBeActiveSession] = useState(initialValueForActiveSession)

    //Check to see if this the set as the current active session or not.
    const initialValueForActiveSession = () => {
        //If sessions data exists, then check it against users current session
        if(sessionServerData[currentIndex]) return sessionServerData[currentIndex]._id === user.currentSession

        //If no session data (probably a new user) set any session as current one
        return true
    }

    //useEffect checks to see if any changes have been made and prompts user to save changes if so. Needs fixing!
    //to change selected session and fetches session data from server if not a new card selected.
    useLayoutEffect(() => {
        setIsBackDropOpen(true)

        //For a new session create a blank sessions or turn an existing one into a blank session
        if(sessionServerData[currentIndex].isBlank){
            setCurrentSessionInfo({...sessionServerData[currentIndex], cardInfo: blankCardInfo()})
            setShouldBeActiveSession(sessionServerData.length === 1? true : false)
        } else if (sessionServerData[currentIndex].isNew) {
            serverFetch.getSessionById(sessionServerData[currentIndex].oldId)
            .then((data) => {
                setCurrentSessionInfo({
                    sessionTitle: data.sessionTitle, 
                    shortTitle: data.shortTitle, 
                    hasChanged: true, 
                    isNew: true,
                    cardInfo: data.cardInfo.map((card) => {
                        return {cardTitle: card.cardTitle, listOfActivities: card.listOfActivities.map((activity) => {
                            return {primary: activity.primary, secondary: activity.secondary, video: activity.video, units: activity.units, userInputDataId: activity.userInputDataId, datum: new Array(activity.units.length).fill('0')}
                        })}
                    })
                })
                setShouldBeActiveSession(false)
            })
            .catch(console.log("Get sessions error. See network fetch for details"))
        } else {
            //If session isn't new then fetch the info from api
            serverFetch.getSessionById(sessionServerData[currentIndex]._id)
            .then((data) => {
                setCurrentSessionInfo(data)
                setShouldBeActiveSession(sessionServerData[currentIndex]._id === user.currentSession)
            })
            .catch(console.log("Get sessions error. See network fetch for details"))
        }
        setIsBackDropOpen(false)
        return () => {
            if(sessionServerData[currentIndex].hasChanged) {
                console.log("User prompt for saving changes")
            }
        }
    }, [currentIndex])

    //Generate a list of all the different cards that have been assigned to that user. For use in listing adding existing cards.
    //Needed to track same activity across different sessions so can draw a chart.
    useEffect(() => {
        serverFetch.getInputDataList(user.name)
            .then((data) => setUserDataTracking(data))
    }, [])

    const handleDeleteClose = () => setDeletePopUpInfo({isOpen: false, targetTitle: ""})

    const handleCardChange = object => handleCardStateChange(object, currentSessionInfo, setCurrentSessionInfo)

    const handleSaveToServer = () => {
        
        //Function to update state of the parent state of server data
        const updateParentState = (id = currentSessionInfo._id) => {
            setSessionServerData(sessionServerData.map((session, index) => index === currentIndex ? {_id: id, sessionTitle: currentSessionInfo.sessionTitle, shortTitle: currentSessionInfo.shortTitle } : session))
        }

        setIsBackDropOpen(true)
        
        //Save user input data info to server
        let newUserDataTracking = userDataTracking.filter(input => !input.hasOwnProperty("_id"))
        
        newUserDataTracking.forEach((userInput) => {
            serverFetch.newInputData({
                userId: user.id,
                name: userInput.name,
                details: userInput.details,
                customId: userInput.customId,
                unit: userInput.inputDataUnit
            })
        })
        setUserDataTracking(userDataTracking.map(data => data.hasOwnProperty('_id')? data : {...data, _id: "willLoadOnRefresh"}))

        //Save info of session to server
        if(currentSessionInfo.isNew) {
            serverFetch.newSession({
                user_id: user.id,
                ...currentSessionInfo
            })
            .then((data) => {
                setCurrentSessionInfo({...currentSessionInfo, _id: data._id, hasChanged: false, isNew: false})
                updateParentState(data._id)
                setIsBackDropOpen(false)
                if(shouldBeActiveSession){
                    serverFetch.changeCurrentSession(user.id, data._id)
                }
            })
            .catch((error) => console.log(error))
        } else {
            if(shouldBeActiveSession){
                serverFetch.changeCurrentSession(user.id, currentSessionInfo._id)
            }
            serverFetch.modifySession(currentSessionInfo._id, currentSessionInfo)
                .then(() => {
                    setIsBackDropOpen(false)
                    setCurrentSessionInfo({...currentSessionInfo, hasChanged: false, isNew: false})
                    updateParentState()
                })
                .catch(() => {
                    console.log("Error uploading to server")
                    //add in pop up to tell user
                })
        }

      
    }

    const handleDeleteSession = () => {
        if(currentSessionInfo.isNew) {
            setCurrentSessionInfo({...sessionServerData[currentIndex], cardInfo: blankCardInfo()})
        } else {
            serverFetch.deleteSession(currentSessionInfo._id)
        }
        setIsDeletePopUpOpen(false)
    }

    function DeleteDialog () {
        return (<Dialog
                    open={isDeletePopUpOpen}
                    onClose={() => setIsDeletePopUpOpen(false)}
                >
                    <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                    <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please confirm that you want to delete {currentSessionInfo.sessionTitle} for the fitness plan, this action cannot be undone.
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setIsDeletePopUpOpen(false)} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteSession} variant="outlined" color="secondary" autoFocus>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>)
    }

    function NewSessionDialog () {

        const handleExistingSession = (index) => {
            setIsNewSessionPopUpOpen(false)
            if(index === 'new'){
                setSessionServerData([...sessionServerData, blankSession])
            } else {
                setSessionServerData([...sessionServerData, {...sessionServerData[index], isNew: true, _id: 'noIdYet', oldId: sessionServerData[index]._id}])
            }
        }

        return (<Dialog
                    open={isNewSessionPopUpOpen}
                    onClose={() => setIsNewSessionPopUpOpen(false)}
                >
                    <DialogTitle id="alert-dialog-title">New Session</DialogTitle>
                    <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Select an existing session or start a new one from scratch:
                            </DialogContentText>
                            <List>
                                <ListItem button onClick={() => handleExistingSession('new')} key={'new'}>New</ListItem>
                                {sessionServerData.map((session, index) => <ListItem button onClick={() => handleExistingSession(index)} key={index}>{session.sessionTitle}</ListItem>)}
                            </List>
                    </DialogContent>
                </Dialog>)
    }

    return(
        <React.Fragment>
            <Grid item xs={8}>
            <Paper className={classes.gridPaper}>
                <Typography>Enter the users fitness data below. If you want a user to be able to track their work out, please add a link between the sessions.</Typography>
                <span className={classes.span}>
                    <Tabs 
                        value={currentIndex}
                        onChange={(event, newValue) => setCurrentIndex(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        className={classes.bottomMargin}
                    >
                        {sessionServerData.map((datum) => <Tab key={datum._id} label={datum.shortTitle}/>)}
                    </Tabs>
                    <Button 
                        variant="outlined"
                        onClick={() => setIsNewSessionPopUpOpen(true)}
                        className={classes.selfAlign}
                    >
                        New Session
                    </Button>
                </span>
                <div className={classes.bottomMargin}>

                <ModifySessionInfo 
                    classes={classes} 
                    currentSessionInfo={currentSessionInfo} 
                    setCurrentSessionInfo={setCurrentSessionInfo} 
                    deleteSession={() => setIsDeletePopUpOpen(true)} 
                    isActiveSession={shouldBeActiveSession} 
                    setShouldBeActiveSession={setShouldBeActiveSession}
                />

                {Boolean(currentSessionInfo.cardInfo) && currentSessionInfo.cardInfo.map((card, cardIndex) => 
                    <ModifySessionCard 
                        cardData={card} 
                        setCardData={handleCardChange} 
                        classes={classes} 
                        cardIndex={cardIndex}
                        userDataTracking={userDataTracking}
                        setUserDataTracking={setUserDataTracking}
                        key={cardIndex}
                    />
                )}

                <Grid item xs={12} className={classes.gridItemFlex}>
                <Button 
                    variant="outlined"
                    className={classes.bottomMargin}
                    onClick={() => handleCardChange({changeType:{object: 'cardInfo', key: 'new'}})}
                >
                    New Card
                </Button>
                <span className={classes.rightAlign}>
                <Button 
                variant="outlined"
                onClick={handleSaveToServer}
                >
                    Save
                </Button></span>
                </Grid>
                </div>
            </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.gridPaper}>
                <Typography>What it looks like to the User:</Typography>
                {Boolean(currentSessionInfo.cardInfo) && 
                    <UserFitnessPlan 
                        fitnessData={currentSessionInfo} 
                        userInputData={userDataTracking} 
                        handleCardChange={handleCardChange} 
                        saveToInputToServer={() => console.log("Not saving to server as preview mode")}
                        handleNextClick={() => console.log("Not moving to next as in preview mode")}
                        handlePreviousClick={() => console.log("Not moving to previous as in preview mode")}
                        flexDirection={"column"}
                    />}
            </Paper>
            </Grid>
            <DeleteDialog />
            <NewSessionDialog />
        </React.Fragment>
    )
}