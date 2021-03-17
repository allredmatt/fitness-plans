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
    }
}));


export const blankActivity = () => [{primary: "Activity Name", secondary: "Details here...", userInputDataId: new Array(1), units: new Array(1), datum:new Array(1)}]
export const blankCardInfo = () => [{cardTitle: "Title", listOfActivities: [{primary: "Activity Name", secondary: "Details here...", userInputDataId: new Array(1), units: new Array(1), datum: new Array(1)}]}]

export default function FitDisplay ({sessionServerData, setSessionServerData, user, setIsBackDropOpen}) {

    const classes = useStyles();

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentSessionInfo, setCurrentSessionInfo] = useState(sessionServerData[sessionServerData.length - 1])
    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false)
    const [userDataTracking, setUserDataTracking] = useState([])
    const [shouldBeActiveSession, setShouldBeActiveSession] = useState(sessionServerData[currentIndex]._id === user.currentSession)

    //useEffect checks to see if any changes have been made and prompts user to save changes if so.
    //to change selected session and fetches session data from server if not a new card selected.
    useLayoutEffect(() => {
        setIsBackDropOpen(true)
        if(sessionServerData[currentIndex].isNew){
            setCurrentSessionInfo({...sessionServerData[currentIndex], cardInfo: blankCardInfo()})
            setShouldBeActiveSession(sessionServerData.length === 1? true : false)
        } else {
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
                    <Button onClick={() => setIsDeletePopUpOpen(false)} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteSession} variant="outlined" color="primary" autoFocus>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>)
    }

    return(
        <React.Fragment>
            <Grid item xs={8}>
            <Paper className={classes.gridPaper}>
                <Typography>Enter the users fitness data below. If you want a user to be able to track their work out, please add a link between the sessions.</Typography>
                <Tabs 
                    value={currentIndex}
                    onChange={(event, newValue) => setCurrentIndex(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    className={classes.bottomMargin}
                >
                    {sessionServerData.map((datum) => <Tab key={datum._id} label={datum.shortTitle}/>)}
                </Tabs>
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
        </React.Fragment>
    )
}