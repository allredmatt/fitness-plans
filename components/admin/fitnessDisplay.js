import { useState, useEffect, useContext }  from 'react';
import { makeStyles, withStyles }           from '@material-ui/core/styles';
import UserFitnessPlan                      from './userFit'
import * as server                          from './serverChanges'
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

export default function FitDisplay ({fitData, setFitData, userId}) {

    const classes = useStyles();

    const blankActivity = JSON.stringify({primary: "", secondary: ""})
    const blankCardInfo = {cardTitle: "", inputDataTypes: [], listOfActivities: [blankActivity], isNew: true, inputData: '[]'}
    const blankSession = {
        sessionTitle: "New Session",
        shortTitle: "New",
        isCurrent: false,
        cardInfo: {data: [blankCardInfo]},
        isNew: true
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentFormInfo, setCurrentFormInfo] = useState(fitData.length === 0? blankSession : fitData[currentIndex])
    const [deletePopUpInfo, setDeletePopUpInfo] = useState({isOpen: false, targetTitle: ""})
    const [existingListPopupAnchor, setExistingListPopupAnchor] = useState(null)

    //useEffect to check if user selects new entry for session data. Creates blank session, needs work to change fitData accordingly.
    //add to this to enable saving to server when tab changes
    useEffect(()=> {
        if(fitData){
            //Save current tab to server before changing to new tab.
            //Won't do anything if hasChanged not flagged in data.
            handleSaveToServer()
            if(currentIndex >= fitData.length){
                //new form needed, append a blank array for new session to fitData
                setFitData([...fitData, blankSession])
                setCurrentFormInfo(blankSession)
            } else {
                //set form info from exiting data
                setCurrentFormInfo(fitData[currentIndex])
            }
        }
    }, [currentIndex])

    //Generate a list of all the different cards that have been assigned to that user. For use in listing adding existing cards.
    //Needed to track same activity across different sessions so can draw a chart.
    let allCardsList = [];
    if(fitData) {
            let setOfCardIds = new Set(); //Use to form a set of Ids so not have repeats of data.
            fitData.forEach((element) => element?.cardInfo?.data.forEach((card) => {
                if(!setOfCardIds.has(card._id)){ //Check if already added to set - if so ignore and don't add to Array
                    setOfCardIds.add(card._id)
                    allCardsList.push(card)
                }
            }));
    }

    const handleDeleteClose = () => {
        setDeletePopUpInfo({isOpen: false, targetTitle: ""})
    }

    const handleCardChange = (newValue, cardIndex, type, sessionHasChanged = true) => {
        let newInfoObject = {...currentFormInfo.cardInfo.data[cardIndex]}
        newInfoObject[type] = newValue
        let data = [...currentFormInfo.cardInfo.data]
        data[cardIndex] = {...newInfoObject, hasChanged: sessionHasChanged}
        let cardInfo = {}
        cardInfo.data = data
        setCurrentFormInfo({...currentFormInfo, cardInfo})
    }

    const handleActivityChange = (activityObject, newValue, cardIndex, activityIndex, type) => {
        //Set up new values based on current data
        let newActivityObj = {...activityObject}
        newActivityObj[type] = newValue
        let listOfActivities = [...currentFormInfo.cardInfo.data[cardIndex].listOfActivities]

        //Change new value to reflect change
        listOfActivities[activityIndex] = JSON.stringify(newActivityObj)

        //Build up nested structure to assign new values to currentFormInfo
        handleCardChange(listOfActivities, cardIndex, "listOfActivities")
    }

    const handleAddNewActivity = (cardIndex) => {
        let listOfActivities = [...currentFormInfo.cardInfo.data[cardIndex].listOfActivities]
        listOfActivities.push(blankActivity)
        handleCardChange(listOfActivities, cardIndex, "listOfActivities")
    }

    const handleAddNewCard = () => {
        let cardInfo = {}
        cardInfo.data = [...currentFormInfo.cardInfo.data]
        cardInfo.data.push(blankCardInfo)
        setCurrentFormInfo({...currentFormInfo, cardInfo})
    }

    const handleAddExistingCard = (allCardIndex) => {
        let cardInfo = {}
        cardInfo.data = [...currentFormInfo.cardInfo.data]
        cardInfo.data.push({...allCardsList[allCardIndex], isExistingCard: true})
        setCurrentFormInfo({...currentFormInfo, cardInfo})
        setExistingListPopupAnchor(null)
    }

    const handleSaveToServer = async () => {
        let resData = null
        if(currentFormInfo.hasChanged) {
            if(currentFormInfo.isNew) {
                //Add new FitPlan on server
                resData = await server.newSession(userId, currentFormInfo.sessionTitle, currentFormInfo.shortTitle, currentFormInfo.isCurrent)
                console.log(resData)
            } else {
                //update FitPlan on server
                server.updateSession(currentFormInfo._id, currentFormInfo.sessionTitle, currentFormInfo.shortTitle, currentFormInfo.isCurrent)
                setCurrentFormInfo({...currentFormInfo, hasChanged: false})
            }
            //Update main fitness state
            handleUpdateMainFitnessState()
        }
        currentFormInfo.cardInfo.data.forEach((card, cardIndex) => {
            if(card.hasChanged){
                let sessionId = resData? resData.id : currentFormInfo._id
                if (card.isNew){
                    //add new card to server
                    server.newCard(sessionId, card.listOfActivities, card.inputDataTypes, card.cardTitle, card.inputData)
                    handleCardChange(false, cardIndex, "isNew", false)
                } else {
                    //update cardInfo on server
                    server.updateCard(card._id, card.listOfActivities, card.inputDataTypes, card.cardTitle, card.inputData)
                    handleCardChange(false, cardIndex, "hasChanged", false)
                }
                //Update main fitness state
                handleUpdateMainFitnessState()

            } else if (card.isExistingCard) {
                //add relationship to server
                let sessionId = resData? resData.id : currentFormInfo._id
                console.log(sessionId)
                server.addRelation(card._id, sessionId, card.listOfActivities, card.inputDataTypes, card.cardTitle, card.inputData)
                handleCardChange(false, cardIndex, "isExistingCard", false)
                //Update main fitness state
                handleUpdateMainFitnessState()
            }
        })
        if(resData) {
            setCurrentFormInfo({...currentFormInfo, hasChanged: false, isNew: false, _id: resData.id})
        }
    }

    const handleDelete = () => {
        switch(deletePopUpInfo.toDelete) {
            case 'session':
                //delete from state
                setCurrentIndex(currentIndex === 0? 1 : 0)
                setFitData(fitData.filter((element, index) => index != currentIndex))
                //delete from server
                server.deleteSession(currentFormInfo._id)
                break;
            case 'card':
                //delete from server
                let card = currentFormInfo.cardInfo.data[deletePopUpInfo.index]
                server.deleteRelation(card._id, currentFormInfo._id, card.listOfActivities, card.inputDataTypes, card.cardTitle, card.inputData)
                //delete from state
                let cardInfo = {}
                cardInfo.data = currentFormInfo.cardInfo.data.filter((curr, index) => index != deletePopUpInfo.index)
                setCurrentFormInfo({...currentFormInfo, cardInfo})
                break;
            default:
                console.log("Undefined property to try and delete")
        }
        handleDeleteClose()
    }

    const handleUpdateMainFitnessState = () => {
        let tempFitData = [...fitData]
        tempFitData[currentIndex] = currentFormInfo
        setFitData(tempFitData)
    }

    function DeleteDialog () {
        return (<Dialog
                    open={deletePopUpInfo.isOpen}
                    onClose={handleDeleteClose}
                >
                    <DialogTitle id="alert-dialog-title">{`Do you wish to delete ${deletePopUpInfo.targetTitle}?`}</DialogTitle>
                    <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please confirm that you want to delete {deletePopUpInfo.targetTitle} for the fitness plan, this action cannot be undone.
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDeleteClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} variant="outlined" color="primary" autoFocus>
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
                            {allCardsList.map((card, index) => 
                                <ListItem key={card.id} button alignItems="flex-start" onClick={()=> handleAddExistingCard(index)}>
                                <ListItemText
                                    primary={card.cardTitle}
                                    secondary={card.listOfActivities.reduce((accumulatedText, current) => 
                                        accumulatedText === "" ? JSON.parse(current).primary : `${accumulatedText} + ${JSON.parse(current).primary}`
                                    , "")}
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
                    {fitData.map((datum) => <Tab key={datum._id} label={datum.shortTitle}/>)}
                    <Tab key="new" label="New Entry"/>
                </Tabs>
                <div className={classes.bottomMargin}>
                <TextField
                    id="session-title"
                    label="Session Title"
                    variant="outlined"
                    size="small"
                    className={classes.textArea}
                    value={currentFormInfo.sessionTitle}
                    onChange={(event) => setCurrentFormInfo({...currentFormInfo, sessionTitle: event.target.value, hasChanged: true})}
                />
                <TextField
                    id="short-title"
                    label="Short Title"
                    variant="outlined"
                    size="small"
                    className={classes.textArea}
                    value={currentFormInfo.shortTitle}
                    onChange={(event) => setCurrentFormInfo({...currentFormInfo, shortTitle: event.target.value, hasChanged: true})}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={currentFormInfo.isCurrent}
                            onChange={(event) => setCurrentFormInfo({...currentFormInfo, isCurrent: event.target.checked, hasChanged: true})}
                            name="isCurrent"
                            color="primary"
                            
                        />}
                    label="Is Active Session"
                />
                <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => setDeletePopUpInfo({isOpen: true, targetTitle: `the whole session`, toDelete: "session"})}
                >
                    <DeleteIcon color="secondary"/>
                </IconButton>                
                {currentFormInfo.cardInfo.data.map((card, cardIndex) => 
                    <Paper className={classes.cardPaper}>
                    <Grid container className={classes.gridRoot} spacing={2}>
                        <Grid item xs={12} className={classes.gridItemFlex}>
                        {card.isExistingCard? 
                        <Typography className={classes.typographyPad}>Existing cards are read only</Typography>
                        : 
                        <Typography className={classes.typographyPad}>Card {cardIndex + 1}:</Typography>
                        }
                        <TextField
                            id="card-title"
                            label="Card Title"
                            variant="outlined"
                            size="small"
                            className={classes.textArea}
                            value={card.cardTitle}
                            onChange={(event) => handleCardChange(event.target.value, cardIndex, "cardTitle")}
                            InputProps={{
                                readOnly: card.isExistingCard,
                              }}
                        />
                        <IconButton 
                            edge="end" 
                            aria-label="delete" 
                            onClick={() => setDeletePopUpInfo({isOpen: true, targetTitle: `Card ${cardIndex + 1}`, toDelete: "card", index: cardIndex})} 
                            className={classes.textArea}
                        >
                            <DeleteIcon color="secondary"/>
                        </IconButton>   
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                        <Divider variant="middle" className={classes.bottomMargin}/>
                        <Typography>List of activities for this card:</Typography>
                        {card.listOfActivities.map((activity, activityIndex)  =>{
                            let activityObject = JSON.parse(activity)
                            activityObject = activityObject.hasOwnProperty('video')? activityObject : {...activityObject, video: ""}
                            return (
                            <div className={classes.textArea} key={activityIndex}>
                                <Typography className={classes.textArea}>Activity {activityIndex + 1}</Typography>
                                <TextField
                                    id="primary-text"
                                    label="Primary Text"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        readOnly: card.isExistingCard,
                                      }}
                                    className={classes.textArea}
                                    value={activityObject.primary}
                                    onChange={(event) => handleActivityChange(activityObject, event.target.value, cardIndex, activityIndex, "primary")}
                                    />
                                <TextField
                                    id="secondary-text"
                                    label="Secondary Text"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        readOnly: card.isExistingCard,
                                      }}
                                    className={classes.textArea}
                                    value={activityObject.secondary}
                                    onChange={(event) => handleActivityChange(activityObject, event.target.value, cardIndex, activityIndex, "secondary")}
                                    />
                                <TextField
                                    id="video-link"
                                    label="Video Link"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        readOnly: card.isExistingCard,
                                      }}
                                    className={classes.textArea}
                                    value={activityObject.video}
                                    onChange={(event) => handleActivityChange(activityObject, event.target.value, cardIndex, activityIndex, "video")}
                                    />
                                {card.isExistingCard?
                                null
                                :
                                <IconButton 
                                    edge="end" 
                                    aria-label="delete" 
                                    onClick={() => handleCardChange(currentFormInfo.cardInfo.data[cardIndex].listOfActivities.filter((ele, index) => index != activityIndex), 
                                                        cardIndex, 
                                                        "listOfActivities")} 
                                    className={classes.textArea}
                                >
                                    <DeleteIcon color="secondary"/>
                                </IconButton> }
                            </div>)}
                        )}
                        <Button 
                            variant="outlined"
                            color="primary"
                            className={classes.bottomMargin}
                            onClick={() => handleAddNewActivity(cardIndex)}
                            >New Activity
                        </Button>
                        <Divider variant="middle" />
                        </Grid>
                        
                        <Grid item xs={12} className={classes.gridItemFlex}>
                        <Typography className={classes.typographyPad}>User input items:</Typography>
                        <ToggleButtonGroup
                            size="small" 
                            value={card.inputDataTypes}
                            onChange={(event, newInputArray) => handleCardChange(newInputArray, cardIndex, "inputDataTypes")} 
                            >
                        <ToggleButton value="kg">
                            Mass
                        </ToggleButton>
                        <ToggleButton value="min">
                            Time
                        </ToggleButton>
                        <ToggleButton value="reps">
                            Reps
                        </ToggleButton>
                        <ToggleButton value="km">
                            Dist
                        </ToggleButton>
                        </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    </Paper>
                )}
                <Grid item xs={12} className={classes.gridItemFlex}>
                <Button 
                    variant="outlined"
                    color="primary"
                    className={classes.bottomMargin}
                    onClick={() => handleAddNewCard()}
                >
                    New Card
                </Button>
                <Button 
                    variant="outlined"
                    color="primary"
                    className={classes.bottomMargin}
                    onClick={(event) => setExistingListPopupAnchor(existingListPopupAnchor? null : event.currentTarget)}
                >
                    Add Existing Card
                </Button>
                <span className={classes.rightAlign}>
                <Button
                variant="outlined"
                color="secondary"
                onClick={() => setCurrentFormInfo(fitData[currentIndex])}
                >
                    Undo
                </Button>
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
                What it looks like to the User:
            <UserFitnessPlan fitnessData={currentFormInfo} />
            </Paper>
            </Grid>
            <DeleteDialog />
            <AddExistingCardListPopup />
        </React.Fragment>
    )
}