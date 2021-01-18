import { useState, useEffect, useLayoutEffect }  from 'react';
import { makeStyles, withStyles }           from '@material-ui/core/styles';
import UserFitnessPlan                      from './userFit'
import * as serverFetch                     from '../../components/serverFetch'
import ModifySessionCard                    from './sessionCard'
import ModifySessionInfo                    from './sessionInfo'
import Card                                 from '@material-ui/core/Card';
import CardContent                          from '@material-ui/core/CardContent';
import Typography                           from '@material-ui/core/Typography';
import CardMedia                            from '@material-ui/core/CardMedia';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid'
import Select                               from '@material-ui/core/Select'
import MenuItem                             from '@material-ui/core/MenuItem';
import InputBase                            from '@material-ui/core/InputBase';
import Tabs                                 from '@material-ui/core/Tabs';
import Tab                                  from '@material-ui/core/Tab';
import FormControlLabel                     from '@material-ui/core/FormControlLabel';
import Switch                               from '@material-ui/core/Switch';
import Divider                              from '@material-ui/core/Divider';
import ToggleButton                         from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup                    from '@material-ui/lab/ToggleButtonGroup';
import DeleteIcon                           from '@material-ui/icons/Delete';
import IconButton                           from '@material-ui/core/IconButton';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogContentText                    from '@material-ui/core/DialogContentText';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Popper                               from '@material-ui/core/Popper';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemText                         from '@material-ui/core/ListItemText';
import List                                 from '@material-ui/core/List';


const useStyles = makeStyles((theme) => ({
    gridPaper:{
        padding: theme.spacing(1),
        height: "100%",
        backgroundColor: "#e6ebfb"
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
    },
    typographyPad:{
        padding: theme.spacing(1),
    },
    rightAlign:{
        marginLeft: "auto"
    }
}));

export default function FitDisplay ({sessionServerData, setSessionServerData, user, setIsBackDropOpen}) {

    const classes = useStyles();

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentSessionInfo, setCurrentSessionInfo] = useState(sessionServerData[sessionServerData.length - 1])
    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false)
    const [existingListPopupAnchor, setExistingListPopupAnchor] = useState(null)
    const [userDataTracking, setUserDataTracking] = useState([])
    const [shouldBeActiveSession, setShouldBeActiveSession] = useState(sessionServerData[currentIndex]._id === user.currentSession)

    const blankActivity = [{primary: "Activity Name", secondary: "Details here...", userInputDataId: [] ,isNew: true}]
    const blankCardInfo = [{cardTitle: "Title", listOfActivities: blankActivity, isNew: true}]
    //useEffect checks to see if any changes have been made and prompts user to save changes if so.
    //to change selected session and fetches session data from server if not a new card selected.
    useLayoutEffect(() => {
        setIsBackDropOpen(true)
        if(sessionServerData[currentIndex].isNew){
            setCurrentSessionInfo({...sessionServerData[currentIndex], cardInfo: blankCardInfo})
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
            .then((data) => setUserDataTracking(data.data))
    }, [])

    const handleDeleteClose = () => {
        setDeletePopUpInfo({isOpen: false, targetTitle: ""})
    }

    const handleCardChange = ({newValue, activityIndex, cardIndex, changeType}) => {
        //{newValue: event.target.value, activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "primary", object: "activity"}}
        //add a hasChanged flag so can check for saving
        setCurrentSessionInfo({...currentSessionInfo, hasChanged: true})
        if(changeType.object === 'cardInfo'){
            switch(changeType.key) {
                case 'delete':
                    setCurrentSessionInfo({
                        ...currentSessionInfo, 
                        cardInfo: currentSessionInfo.cardInfo.filter((card, index) => index != cardIndex)
                    })
                    break
                case 'new':
                    console.log("triggered")
                    setCurrentSessionInfo({
                        ...currentSessionInfo, 
                        cardInfo: currentSessionInfo.cardInfo.concat(blankCardInfo)
                    })
                    break
                default:
                    setCurrentSessionInfo({
                        ...currentSessionInfo, 
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
                    newActivityArray = currentSessionInfo.cardInfo[cardIndex].listOfActivities.concat(blankActivity)
                    //add a blank activity to end of array
                    break
                default:
                    newActivityArray = currentSessionInfo.cardInfo[cardIndex].listOfActivities.map((activity, index) => index === activityIndex ? {...activity, [changeType.key]: newValue } : activity)
                    //change the key to new value for the activity with correct index
            }
            console.log(newActivityArray)
            //Use current function called again with card changes to the listOfActivities key to implement activity change.
            handleCardChange(
                {
                    newValue: newActivityArray,
                    cardIndex: cardIndex,
                    changeType: {
                        key: 'listOfActivities',
                        object: 'cardInfo',
                    }
                }
            )
        }
    }

    const handleSaveToServer = () => {
        setIsBackDropOpen(true)
        if(shouldBeActiveSession){
            serverFetch.changeCurrentSession(user.id, currentSessionInfo._id)
        }
        serverFetch.modifySession(currentSessionInfo._id, currentSessionInfo)
            .then(() => {
                setIsBackDropOpen(false)
                setCurrentSessionInfo({...currentSessionInfo, hasChanged: false, isNew: false})
            })
            .catch(() => {
                console.log("Error uploading to server")
                //add in pop up to tell user
            })
        
    }

    const handleDeleteSession = () => {
        if(currentSessionInfo.isNew) {
            setCurrentSessionInfo({...sessionServerData[currentIndex], cardInfo: blankCardInfo})
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

    function AddExistingCardListPopup () {
        return (<Popper
                    placement="bottom-start"
                    disablePortal={false}
                    open={Boolean(existingListPopupAnchor)}
                    anchorEl={existingListPopupAnchor}
                    modifiers={{
                        flip: {
                            enabled: true,
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'scrollParent',
                        },
                    }}
                >
                    <Paper elevation={3} className={classes.paper} >
                            <List>
                            {userDataTracking?.map((datum, index) => 
                                <ListItem key={index} button alignItems="flex-start" onClick={()=> handleAddExistingCard(index)}>
                                <ListItemText
                                    primary={datum.name}
                                    secondary={datum._id}
                                    />
                                </ListItem>)}
                            </List>
                    </Paper>
                </Popper>)
    }

    return(
        <React.Fragment>
            <Grid item xs={8}>
            <Paper className={classes.gridPaper}>
                <Typography>Enter the users fitness data below. If you want a user to be able to track their work out, please ensure you use the add exiting workout button.</Typography>
                <Tabs 
                    value={currentIndex}
                    onChange={(event, newValue) => setCurrentIndex(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
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
                    <ModifySessionCard cardData={card} setCardData={handleCardChange} classes={classes} cardIndex={cardIndex}/>
                )}

                <Grid item xs={12} className={classes.gridItemFlex}>
                <Button 
                    variant="outlined"
                    color="primary"
                    className={classes.bottomMargin}
                    onClick={() => handleCardChange({changeType:{object: 'cardInfo', key: 'new'}})}
                >
                    New Card
                </Button>
                <span className={classes.rightAlign}>
                <Button 
                variant="outlined"
                color="primary"
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
                {Boolean(currentSessionInfo.cardInfo) && <UserFitnessPlan fitnessData={currentSessionInfo} />}
            </Paper>
            </Grid>
            <DeleteDialog />
            <AddExistingCardListPopup />
        </React.Fragment>
    )
}