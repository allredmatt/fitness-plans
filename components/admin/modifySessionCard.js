import { useState }                         from 'react'
import Typography                           from '@material-ui/core/Typography';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid'
import Divider                              from '@material-ui/core/Divider';
import ToggleButton                         from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup                    from '@material-ui/lab/ToggleButtonGroup';
import DeleteIcon                           from '@material-ui/icons/Delete';
import IconButton                           from '@material-ui/core/IconButton';
import LinkIcon                             from '@material-ui/icons/Link';
import Popover                              from '@material-ui/core/Popover';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemText                         from '@material-ui/core/ListItemText';
import List                                 from '@material-ui/core/List';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import Dialog                               from '@material-ui/core/Dialog';
import SaveIcon                             from '@material-ui/icons/Save';
import { makeStyles }                       from '@material-ui/core/styles';
import CloseIcon                            from '@material-ui/icons/Close';
import Table                                from '@material-ui/core/Table';
import TableBody                            from '@material-ui/core/TableBody';
import TableCell                            from '@material-ui/core/TableCell';
import TableContainer                       from '@material-ui/core/TableContainer';
import TableHead                            from '@material-ui/core/TableHead';
import TableRow                             from '@material-ui/core/TableRow';
import ToolTip                              from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    paperContainer:{
        padding: theme.spacing(2),
    },
    button:{
        float: "right"
    },
    closeButton:{
        position: "absolute",
        right: "0px",
    },
    cardPaper:{
        backgroundColor: theme.palette.background.highlighted
    },
    redButton:{
        color: theme.palette.error.main
    }
}))


export default function ModifySessionCard ({classes, cardData, cardIndex, setCardData, userDataTracking, setUserDataTracking}) {

    const localClasses = useStyles()

    const [addLink, setAddLink] = useState({open: false})
    const [isNewLinkDialogOpen, setIsNewLinkDialogOpen] = useState(false)

    function AddLinkPopup () {

        function handleClickAdd (type, unit) {
            if(type === 'new') {
                setIsNewLinkDialogOpen(true)
            } else {
                //Add the unit to the activity array
                setCardData({newValue: {id: type, unit: unit}, activityIndex: addLink.activityIndex, cardIndex: addLink.cardIndex, changeType: {key: "units", object: "activity"}})
                //Close the pop up dialog box
                setAddLink({open: false})
            }
        }

        return (<Popover
                    open={addLink.open}
                    onClose={() => setAddLink({open: false})}
                    anchorEl={addLink.anchor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                >
                    <Paper elevation={3} className={classes.paper} >
                        <List>
                        <ListItem key="newItem" button alignItems="flex-start" onClick={()=> handleClickAdd('new')}>
                        <ListItemText
                            primary={`New`}
                            secondary={`Add a new link`}
                            />
                        </ListItem>
                        <Divider/>
                        {userDataTracking?.map((datum, index) => 
                            <ListItem key={index} button alignItems="flex-start" onClick={()=> handleClickAdd(datum.customId, datum.inputDataUnit)}>
                            <ListItemText
                                primary={`Name: ${datum.name}`}
                                secondary={`ID: ${datum.customId}`}
                                />
                            </ListItem>)}
                        </List>
                    </Paper>
                </Popover>)
    }

    function NewLinkDialog() {
      
        const [formData, setFormData] = useState({name: "", unit: ""})

        const handleClose = () => {
          setIsNewLinkDialogOpen(false);
          setAddLink({open: false})
        };
      
        const handleSubmit = () => {
            function getRandomInt(max) {
                //generate random ID
                let randNum = Math.floor(Math.random() * Math.floor(max));
                //Check if ID already assigned
                if(userDataTracking) {
                    if (userDataTracking.findIndex((element) => element.customId === randNum) === -1){
                        return randNum
                    } else {
                        return getRandomInt(max)
                    }
                } else {
                    return randNum
                }
            }
          //if to check some data has been inputted.
          if(formData.unit && formData.name) {
            let tempId = getRandomInt(10000)
            //Add new input to activity within card
            setCardData({newValue: {id: tempId, unit: formData.unit}, activityIndex: addLink.activityIndex, cardIndex: addLink.cardIndex, changeType: {key: "units", object: "activity"}})
            //Store creation of newUserInputData till save is clicked in userTrackingData.
            setUserDataTracking([...userDataTracking, {customId: tempId, inputDataUnit: formData.unit, name: formData.name, details: `${cardData.cardTitle}: ${cardData.listOfActivities[addLink.activityIndex].primary}`}])
          }
          handleClose()
        };
      
        return (
          <Dialog onClose={handleClose} aria-labelledby="add-new-user-input-data-link" open={isNewLinkDialogOpen} maxWidth="xs" fullWidth>
            <DialogTitle id="add-new-user-input-data-link">Enter details for new user data input:</DialogTitle>
            <Paper elevation={0} className={localClasses.paperContainer}>
            <Typography color="textSecondary" className={classes.textArea}>Choose a unique name that makes this user input easy for you to remember.</Typography>
            <TextField
                id="input-name"
                label="Input Name"
                variant="outlined"
                size="small"
                className={classes.textArea}
                value={formData.name}
                onChange={(event) => setFormData({...formData, name: event.target.value})}
            />
            <Typography color="textSecondary" className={classes.textArea}>Please enter a unit that is displayed after the user input item eg km, reps, rounds...</Typography>
            <TextField
                id="input-unit"
                label="Input Unit"
                variant="outlined"
                size="small"
                className={classes.textArea}
                value={formData.unit}
                onChange={(event) => setFormData({...formData, unit: event.target.value})}
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                className={localClasses.button}
                onClick={handleSubmit}
            >
                Save
            </Button>
            </Paper> 
          </Dialog>
        );
      }

      function findIdInUserTrackingData (id) {
          return userDataTracking?.filter(datum => datum.customId === id)[0]
      }

    return (
        <Paper className={classes.cardPaper}>
        <Grid container className={classes.gridRoot} spacing={2}>
            <Grid item xs={12} className={classes.gridItemFlex}>
            <Typography color="textSecondary" className={classes.typographyPad}>Card {cardIndex + 1}:</Typography>
            <TextField
                id="card-title"
                label="Card Title"
                variant="outlined"
                size="small"
                className={classes.textArea}
                value={cardData.cardTitle}
                onChange={(event) => setCardData({newValue: event.target.value, cardIndex: cardIndex, changeType: {key: "cardTitle", object: "cardInfo"}})}
            />
            <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => setCardData({cardIndex: cardIndex, changeType: {key: "delete", object: "cardInfo"}})} 
                className={classes.textArea}
            >
                <DeleteIcon className={localClasses.redButton} />
            </IconButton>   
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
            <Divider variant="middle" className={classes.bottomMargin}/>
            <Typography color="textSecondary" >List of activities for this card:</Typography>
            {cardData.listOfActivities.map((activity, activityIndex)  =>{
                return (
                <div className={classes.textArea} key={activityIndex}>
                    <Typography color="textSecondary" className={classes.textArea}>Activity {activityIndex + 1}</Typography>
                    <TextField
                        id="primary-text"
                        label="Primary Text"
                        variant="outlined"
                        size="small"
                        className={classes.textArea}
                        value={activity.primary}
                        onChange={(event) => setCardData({newValue: event.target.value, activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "primary", object: "activity"}})}
                        />
                    <TextField
                        id="secondary-text"
                        label="Secondary Text"
                        variant="outlined"
                        size="small"
                        className={classes.textArea}
                        value={activity.secondary}
                        onChange={(event) => setCardData({newValue: event.target.value, activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "secondary", object: "activity"}})}
                        />
                    <TextField
                        id="video-link"
                        label="Video Link"
                        variant="outlined"
                        size="small"
                        className={classes.textArea}
                        value={activity.video}
                        onChange={(event) => setCardData({newValue: event.target.value, activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "video", object: "activity"}})}
                        />
                    <ToolTip title="Add data input for user" aria-label="add data input for user">
                    <IconButton 
                        edge="end" 
                        aria-label="link" 
                        onClick={(event) => setAddLink({...addLink, open: true, cardIndex: cardIndex, activityIndex: activityIndex, anchor: event.target})} 
                        className={classes.textArea}
                    >
                        <LinkIcon color="secondary"/>
                    </IconButton>
                    </ToolTip>
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => setCardData({activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "delete", object: "activity"}})} 
                        className={classes.textArea}
                    >
                        <DeleteIcon className={localClasses.redButton} />
                    </IconButton>
                    <Typography color="textSecondary" >Current user inputs for this activity:</Typography>
                    {activity.userInputDataId.length === 0 ?
                    <Typography color="textSecondary" >None</Typography>
                    :
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="input data table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>ID</b></TableCell>
                                <TableCell><b>Unit</b></TableCell>
                                <TableCell><b>Delete</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {activity.userInputDataId.map((inputId, index) =>
                            <TableRow key={inputId}>
                                <TableCell >{findIdInUserTrackingData(inputId)?.name}</TableCell>
                                <TableCell>{inputId}</TableCell>
                                <TableCell>{activity.units[index]}</TableCell>
                                <TableCell>
                                    <IconButton 
                                        edge="end" 
                                        aria-label="delete"
                                        size='small'
                                        onClick={() => setCardData({activityIndex: activityIndex, cardIndex: cardIndex, userDataIndex: index, changeType: {key: "deleteUserData", object: "activity"}})} 
                                        className={classes.textArea}
                                    >
                                        <DeleteIcon fontSize="small" className={localClasses.redButton}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                    <Divider variant="middle" />
                </div>)}
            )}
            <Button 
                variant="outlined"
                className={classes.bottomMargin}
                onClick={() => setCardData({cardIndex: cardIndex, changeType: {key: "new", object: "activity"}})}
                >New Activity
            </Button>
            </Grid>
        </Grid>
        <AddLinkPopup />
        <NewLinkDialog />
        </Paper>
    )
}

