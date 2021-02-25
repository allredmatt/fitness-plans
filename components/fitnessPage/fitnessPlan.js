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
import InputAdornment           from '@material-ui/core/InputAdornment';
import DataLog                  from './dataLog'
import Snackbar                 from '@material-ui/core/Snackbar';
import * as serverFetch         from '../serverFetch'
import {handleCardStateChange}  from './stateManagement'
import UserFitnessPlan          from './userFit'
import Rating                   from '@material-ui/lab/Rating';
import Box                      from '@material-ui/core/Box';
import Dialog                   from '@material-ui/core/Dialog';
import DialogActions            from '@material-ui/core/DialogActions';
import DialogContent            from '@material-ui/core/DialogContent';
import DialogContentText        from '@material-ui/core/DialogContentText';
import DialogTitle              from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1)
        },
        root: {
            width: '100%',
        },
        bottomMargin: {
            marginBottom: theme.spacing(2)
        },
        box: {
            display: 'flex',
            flexDirection: 'column'
        }
}));

export const labels = {
            1: 'Too Easy',
            2: 'Extremely Easy',
            3: 'Very Easy',
            4: 'A Little Easy',
            5: 'Moderate',
            6: 'A Little Hard',
            7: 'Quite Hard',
            8: 'Very Hard',
            9: 'Extremely Hard',
            10: 'Too Hard',
          };

export default function FitnessPlan ({fitnessData, user, setShowBackDrop}) {

    const minWidth = useMediaQuery('(min-width:1000px)');

    const classes = useStyles()

    const [userInputData, setUserInputData] = useState([])
    const [currentFitnessPlan, setCurrentFitnessPlan] = useState()
    const [idOfFitnessPlanToDisplay, setIdOfFitnessPlanToDisplay] = useState(user.currentSession)
    const [isFinishedSessionSnackbarOpen, setIsFinishedSessionSnackbarOpen] = useState(false)
    const [isSubmitRatingDialogOpen, setIsSubmitRatingDialogOpen] = useState(false)

    let customIdToServerIdMap = {}
    
    useEffect(()=> {
        //Load userInputData for that session, only needs to happen once, all data loaded
        if(userInputData.length === 0) {
            serverFetch.getInputDataList(user.name)
                .then(data => setUserInputData(data))
                .catch(error => console.log("Error fetching user input data:", error))
        }
    }, [userInputData])

    useEffect(()=> {
        //Load data for current session
        serverFetch.getSessionById(idOfFitnessPlanToDisplay)
            .then(data => {
                setCurrentFitnessPlan(data)
                setShowBackDrop(false)
            })
            .catch(error => console.log("Error fetching session data:", error))
    }, [idOfFitnessPlanToDisplay])    
     
    const handleNextClick = () => {
        setShowBackDrop(true)
        //If user selects next session change index to be displayed, check if it's the last session before advancing
        const currentIndex = fitnessData.findIndex(session => session._id === idOfFitnessPlanToDisplay)
        if(currentIndex === fitnessData.length -1){
            console.log("Already at end of sessions")
            setShowBackDrop(false)
            setIsFinishedSessionSnackbarOpen(true)
            //Add some messaging for this to user
            return
        } else if( currentIndex === -1 ){
            console.log("Error finding current session in fitness plan")
            setShowBackDrop(false)
            return
        } else {
            setIdOfFitnessPlanToDisplay(fitnessData[currentIndex + 1]._id)
        }
    }
    
    const handlePreviousClick = () => {
        setShowBackDrop(true)
        //As above but for going backwards
        const currentIndex = fitnessData.findIndex(session => session._id === idOfFitnessPlanToDisplay)
        if(currentIndex === 0){
            console.log("Already at start of sessions")
            setShowBackDrop(false)
            return
        } else if( currentIndex === -1 ){
            console.log("Error finding current session in fitness plan")
            setShowBackDrop(false)
            return
        } else {
            setIdOfFitnessPlanToDisplay(fitnessData[currentIndex - 1]._id)
        }
    }

    const handleSaveInputToServer = (rating, notes) => {
        setShowBackDrop(true)
        //Close dialog box
        setIsSubmitRatingDialogOpen(false)

        //User has inputted data and now need to change state and upload so server
        //Deal with session info first
        serverFetch.modifySession(currentFitnessPlan._id, {...currentFitnessPlan, notes: notes, rating: rating})

        //Set next session in plan to be current
        const currentIndex = fitnessData.findIndex(session => session._id === idOfFitnessPlanToDisplay)

        if(currentIndex === fitnessData.length -1){
            console.log("Already at end of sessions")
            setIsFinishedSessionSnackbarOpen(true)
            setShowBackDrop(false)

        } else if( currentIndex === -1 ){
            console.log("Error finding current session in fitness plan")
            setShowBackDrop(false)
        } else {
            serverFetch.changeCurrentSession(user.id, fitnessData[currentIndex + 1]._id)

            setIdOfFitnessPlanToDisplay(fitnessData[currentIndex + 1]._id)
        }

        //Deal with data user has inputted, save to /data api
        //Remove all data not needed and filter out any activities that have no data
        currentFitnessPlan.cardInfo.reduce(
            (accumulator, current) => {
                let activityWithUnits = current.listOfActivities.filter(activity => activity.units.length != 0)
                return accumulator.concat(activityWithUnits)
            },
            []
        )
        //For each of the activities left save info to server
            .forEach(
                (activity) => {
                    activity.units.forEach(
                        (unit, index) => {
                            serverFetch.modifyInputData (
                                activity.userInputDataId[index],
                                {
                                    datum: activity.datum[index],
                                    shortTitle: currentFitnessPlan.shortTitle,
                                    sessionId: currentFitnessPlan._id
                                }
                            )
                        }
                    )
                }
            )
        
        //Should really reload user input data here, going to be tricky as forEach isn't async but modifyInputData is.
        //Don't want to await each one as slow down upload, will see how long it takes.
    }
    
    const handleCardChange = object => handleCardStateChange(object, currentFitnessPlan, setCurrentFitnessPlan)

    function SubmitDialog () {

        const [sessionRating, setSessionRating] = useState(currentFitnessPlan.rating || 5)
        const [notes, setNotes] = useState(currentFitnessPlan.notes)
        const [hover, setHover] = useState(-1)

        

        return (<Dialog
                    open={isSubmitRatingDialogOpen}
                    onClose={() => setIsSubmitRatingDialogOpen(false)}
                >
                    <DialogTitle id="rate-session">Please rate your session</DialogTitle>
                    <DialogContent>
                            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
                                <Typography component="legend">Rating: {sessionRating !== null && labels[hover !== -1 ? hover : sessionRating]}</Typography>
                                <Rating 
                                    name="customized-10" 
                                    value={sessionRating} 
                                    onChange={(event, newValue) => setSessionRating(newValue)} 
                                    onChangeActive={(event, newHover) => setHover(newHover)}
                                    max={10}
                                    className={classes.bottomMargin}   
                                />
                                <TextField
                                    id="multiline-notes-input"
                                    label="Add any notes if you want"
                                    multiline
                                    rows={2}
                                    value={notes}
                                    onChange={(event) => setNotes(event.currentTarget.value)}
                                    variant="outlined"
                                />
                            </Box>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setIsSubmitRatingDialogOpen(false)} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSaveInputToServer(sessionRating, notes)} variant="outlined" color="primary" autoFocus>
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>)
    }

    if(currentFitnessPlan){
        return(
            
            <div className={classes.root}>
            <Paper className={classes.paper} elevation={2}>
                    <Typography gutterBottom variant="h5" component="h2">
                            Fitness Plan
                    </Typography>
                    <UserFitnessPlan 
                        fitnessData={currentFitnessPlan}
                        setFitnessData={setCurrentFitnessPlan} 
                        userInputData={userInputData} 
                        handleCardChange={handleCardChange} 
                        saveToInputToServer={() => setIsSubmitRatingDialogOpen(true)} 
                        handleNextClick={handleNextClick} 
                        handlePreviousClick={handlePreviousClick}
                        flexDirection={minWidth? "row" : "column"}
                        allSessionsRendered={false}
                    />
                    <DataLog fitnessData={[]} />
            </Paper>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={isFinishedSessionSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setIsFinishedSessionSnackbarOpen(false)}
                message="You have finished all your current sessions"
            />
            <SubmitDialog />
        </div>)
    } else {return null}
}