import { useState }             from 'react'
import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import IconButton               from '@material-ui/core/IconButton';
import List                     from '@material-ui/core/List';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import ListItemText             from '@material-ui/core/ListItemText';
import YouTubeIcon              from '@material-ui/icons/YouTube';
import TextField                from '@material-ui/core/TextField';
import InputAdornment           from '@material-ui/core/InputAdornment';
import Tooltip                  from '@material-ui/core/Tooltip';
import SkipPreviousIcon         from '@material-ui/icons/SkipPrevious';
import SkipNextIcon             from '@material-ui/icons/SkipNext';
import Fab                      from '@material-ui/core/Fab';
import SaveIcon                 from '@material-ui/icons/Save';
import Rating                   from '@material-ui/lab/Rating';
import InputBase                from '@material-ui/core/InputBase';
import { labels }               from './fitnessPlan'



export default function UserFitnessPlan ({
    fitnessData, setFitnessData, userInputData, handleCardChange, 
    saveToInputToServer, handleNextClick, handlePreviousClick, flexDirection,
    allSessionsRendered
}) {

    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: theme.palette.background.paper,
            margin: theme.spacing(1),
            
        },
        paper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1)
        },
        root: {
            width: '100%',
        },
        flexDiv:{
            display: 'flex',
            flexDirection: flexDirection,
            minWidth: '180px'
        },
        controls: {
            display: allSessionsRendered? 'none' : 'flex',
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
            width: '28ch',
        },
        inputStart:{
            color: theme.palette.text.secondary,
            paddingRight: theme.spacing(4)
        },
        rightAlign:{
            marginTop: "auto",
            marginLeft: flexDirection === "row" ? theme.spacing(1) : "auto",
            paddingRight: theme.spacing(1)
        }
    }));

    const classes = useStyles();

    const [hover, setHover] = useState(-1)

    function submitUserData() {
        saveToInputToServer()
    }


    function handleUserInputChange (newValue, cardIndex, activityIndex, dataPointIndex) {
        //Set up a copy of array of datum from activity you want to change
        let currentDatumArray = [...fitnessData.cardInfo[cardIndex].listOfActivities[activityIndex].datum]
        //Mutate the value at the index that has changed
        currentDatumArray[dataPointIndex] = newValue
        //Call handle change (passes through props) with new array
        handleCardChange({
            newValue: currentDatumArray, 
            activityIndex: activityIndex, 
            cardIndex: cardIndex, 
            changeType: {key: "datum", object: "activity"}})
    }

    function lookupPreviousData (dataCustomId, sessionId) {
        let foundIndex = userInputData.findIndex(datum => datum.customId === dataCustomId)
        //Didn't find any ID
        if (foundIndex === -1) {
            return "N/A"
        } else {
                if(userInputData[foundIndex].inputtedData){
                    let foundSessionIndex = userInputData[foundIndex].inputtedData.findIndex(data => data.sessionId === sessionId)
                    if (foundSessionIndex === -1) {
                        //If no session ID exists in userInputData for this customId, then display most recent data point
                        try {return userInputData[foundIndex].inputtedData[userInputData[foundIndex].inputtedData.length - 1].datum}
                        catch {return "N/A"}
                    } else {
                        //If sessionId is in customId data then return previous place in array
                        try {return userInputData[foundIndex].inputtedData[foundSessionIndex - 1].datum}
                        catch {return "N/A"}
                    }
                } else {
                    return "N/A"
                }
        }
    }
     
    if(fitnessData){
        return(
            <div className={classes.root}>
                <div className={classes.controls} hidden={allSessionsRendered}>
                    <Tooltip title="Previous workout" aria-label="previous">
                        <IconButton aria-label="previous" onClick={handlePreviousClick}>
                            <SkipPreviousIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" component="h3">
                        {fitnessData.sessionTitle}
                    </Typography>
                    <Tooltip title="Next workout" aria-label="next">
                        <IconButton aria-label="next" onClick={handleNextClick}>
                            <SkipNextIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={classes.flexDiv}>
                {fitnessData.cardInfo?.map((cardData, cardIndex) => 
                    <Card className={classes.card} key={cardIndex}>
                        <CardContent >
                            <Typography variant="subtitle2" component="span" >
                                {cardData.cardTitle}
                            </Typography>
                            <List className={classes.listRoot}>
                                    {cardData.listOfActivities.map((activity, activityIndex) => 
                                        <React.Fragment key ={"fragmentkey" + activityIndex}>
                                            <ListItem key ={"listKey"+activityIndex}>
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
                                            {Boolean(activity.units) &&
                                                <React.Fragment>
                                                    {activity.units.map((unit, inputDataIndex) => 
                                                    <ListItem key={inputDataIndex}>
                                                        <TextField
                                                            label="Your workout"
                                                            id="your-workout"
                                                            className={classes.textField}
                                                            value={activity.datum[inputDataIndex]}
                                                            onChange={(event) => handleUserInputChange(event.currentTarget.value, cardIndex, activityIndex, inputDataIndex)}
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
                                                                startAdornment: allSessionsRendered? null : <InputAdornment className={classes.inputStart} position="start">Prev: {lookupPreviousData(activity.userInputDataId[inputDataIndex], fitnessData._id)}</InputAdornment>,
                                                                readOnly: allSessionsRendered,
                                                            }}
                                                            variant="outlined"
                                                            />
                                                    </ListItem>)}
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    )}
                            </List>
                        </CardContent>
                    </Card>
                )}
                {(Boolean(fitnessData.notes) || fitnessData.notes === "") && 
                    <Card className={classes.card} key="notes">
                        <CardContent >
                        <Typography variant="subtitle2" component="span" >
                            Notes you have made:
                        </Typography>
                        <List className={classes.listRoot}>
                            <ListItem>
                                <ListItemText
                                className={classes.listItem}
                                primary={
                                    <InputBase
                                        className={classes.margin} 
                                        value={fitnessData.notes}
                                        onChange={(event) => setFitnessData({...fitnessData, notes: event.currentTarget.value})}
                                        inputProps={{ 'aria-label': 'notes' }}
                                    />
                                }
                                />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                }
                {Boolean(fitnessData.rating) && 
                    <Card className={classes.card} key="ratings">
                        <CardContent >
                        <Typography variant="subtitle2" component="span" >
                            Rating you have given this session:
                        </Typography>
                        <List className={classes.listRoot}>
                            <ListItem>
                                <ListItemText
                                className={classes.listItem}
                                primary={fitnessData.rating !== null && labels[hover !== -1 ? hover : fitnessData.rating]}
                                secondary={
                                    <Rating 
                                        name="session-rating" 
                                        value={fitnessData.rating} 
                                        max={10}
                                        onChange={(event) => setFitnessData({...fitnessData, rating: event.currentTarget.value})}
                                        onChangeActive={(event, newHover) => setHover(newHover)}
                                    />
                                }
                                />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                }
                <span className={classes.rightAlign} hidden={allSessionsRendered}>
                    <Tooltip title="Save Your Workout Data" aria-label="save data">
                    <Fab 
                        color="primary"
                        aria-label="save"
                        onClick={submitUserData}
                    >
                        <SaveIcon />
                    </Fab>
                    </Tooltip>
                </span>
                </div>
                
        </div>)
    } else {return null}
}