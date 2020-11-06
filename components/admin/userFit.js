import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import IconButton               from '@material-ui/core/IconButton';
import Divider                  from '@material-ui/core/Divider';
import List                     from '@material-ui/core/List';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import ListItemText             from '@material-ui/core/ListItemText';
import YouTubeIcon              from '@material-ui/icons/YouTube';
import Button                   from '@material-ui/core/Button';
import CardActions              from '@material-ui/core/CardActions';
import TextField                from '@material-ui/core/TextField';
import InputAdornment           from '@material-ui/core/InputAdornment';



export default function UserFitnessPlan ({fitnessData}) {
    
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
            flexDirection: "column",
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
     
    if(fitnessData){
        return(
            <div className={classes.root}>
                <div className={classes.flexDiv}>
                {fitnessData.cardInfo?.data.map((cardData, index) => 
                    <Card className={classes.card} key={index}>
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
                                <ListItem key={element}>
                                    <TextField
                                        label="Your workout"
                                        id="outlined-start-adornment"
                                        className={classes.textField}
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{element}</InputAdornment>,
                                        }}
                                        variant="outlined"
                                        />
                                </ListItem>)}
                            </List>
                            </React.Fragment>
                            }
                            <CardActions>
                                    <Button 
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                    >
                                        {cardData?.inputDataTypes.length === 0? "Finished" : "Submit"}
                                    </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                )}
                </div>
        </div>)
    } else {return null}
}