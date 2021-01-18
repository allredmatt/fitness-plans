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


export default function ModifySessionCard ({classes, cardData, cardIndex, setCardData}) {
    return (
        <Paper className={classes.cardPaper}>
        <Grid container className={classes.gridRoot} spacing={2}>
            <Grid item xs={12} className={classes.gridItemFlex}>
            <Typography className={classes.typographyPad}>Card {cardIndex + 1}:</Typography>
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
                <DeleteIcon color="secondary"/>
            </IconButton>   
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
            <Divider variant="middle" className={classes.bottomMargin}/>
            <Typography>List of activities for this card:</Typography>
            {cardData.listOfActivities.map((activity, activityIndex)  =>{
                return (
                <div className={classes.textArea} key={activityIndex}>
                    <Typography className={classes.textArea}>Activity {activityIndex + 1}</Typography>
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
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => setCardData({activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "delete", object: "activity"}})} 
                        className={classes.textArea}
                    >
                        <DeleteIcon color="secondary"/>
                    </IconButton>
                    <Grid item xs={12} className={classes.gridItemFlex}>
                        <Typography className={classes.typographyPad}>User input items:</Typography>
                        <ToggleButtonGroup
                            size="small" 
                            value={cardData.inputDataTypes}
                            onChange={(event, newInputArray) => setCardData({newValue: newInputArray, activityIndex: activityIndex, cardIndex: cardIndex, changeType: {key: "units", object: "activity"}})} 
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
                        <ToggleButton value="rounds">
                            Rnds
                        </ToggleButton>
                        <ToggleButton value="km">
                            Dist
                        </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </div>)}
            )}
            <Button 
                variant="outlined"
                color="primary"
                className={classes.bottomMargin}
                onClick={() => setCardData({cardIndex: cardIndex, changeType: {key: "new", object: "activity"}})}
                >New Activity
            </Button>
            <Divider variant="middle" />
            </Grid>
        </Grid>
        </Paper>
    )
}