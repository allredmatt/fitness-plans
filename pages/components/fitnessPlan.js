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
            width: '98%',
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
    }));

    const classes = useStyles();

    const [isClicked, setIsClicked] = useState(false)
    const [indexToBeDisplayed, setIndexToBeDisplayed] = useState(fitnessData?.findIndex((element) => element.isCurrent) || 0)

    if(indexToBeDisplayed === -1){
        setIndexToBeDisplayed(0)
    }
    
    const filteredFitnessData = fitnessData? fitnessData[indexToBeDisplayed] : null
    
    const handleNextClick = () => {
        setIndexToBeDisplayed(fitnessData.length === (indexToBeDisplayed + 1) ? indexToBeDisplayed : indexToBeDisplayed + 1)
    }
    
    const handlePreviousClick = () => {
        setIndexToBeDisplayed((indexToBeDisplayed - 1) === -1 ? 0 : indexToBeDisplayed - 1)
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
                {filteredFitnessData.cardInfo?.map((cardData) => 
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
                            <CardActions>
                                {isClicked? 
                                    <CheckCircleTwoToneIcon color="primary"/>
                                    :
                                    <Button 
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        onClick={()=> setIsClicked(true)}
                                    >
                                        Finished this
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