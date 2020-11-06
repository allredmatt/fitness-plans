import { makeStyles }           from '@material-ui/core/styles';
import Typography               from '@material-ui/core/Typography';
import Paper                    from '@material-ui/core/Paper';
import Timeline                 from '@material-ui/lab/Timeline';
import TimelineItem             from '@material-ui/lab/TimelineItem';
import TimelineSeparator        from '@material-ui/lab/TimelineSeparator';
import TimelineConnector        from '@material-ui/lab/TimelineConnector';
import TimelineContent          from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent  from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot              from '@material-ui/lab/TimelineDot';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemText             from '@material-ui/core/ListItemText';
import List                     from '@material-ui/core/List';
import Grid                     from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
        gridPaper:{
            padding: theme.spacing(1),
            height: "100%",
            backgroundColor: "white"
        },
        gridItem:{
            marginBottom: theme.spacing(1),
        },
        paper: {
            padding: '6px 16px',
        },
    }));

export default function FoodDisplay ({foodData}) {

    const classes = useStyles();

    const datesWithInfo = foodData? Array.from(new Set(foodData.map((entry) => entry.time.toLocaleDateString()))) : "";

    const foodDataModified = datesWithInfo.reduce((acc, date) => {
        acc[date] = foodData.filter((item) => item.time.toLocaleDateString() === date)
        return acc
    }, [])

    return(
        <Grid item xs={12} >
        <Paper className={classes.gridPaper}>
            Food data inputted from user -
        <Timeline align="alternate">
            {datesWithInfo.map((date) => 
                <TimelineItem key={date}>
                    <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                        {date}
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                            <List>
                            {foodDataModified[date].map((foodItem) =>
                            <ListItem key={foodItem.id} alignItems="flex-start" >
                                <ListItemText
                                    primary={foodItem.type}
                                    secondary={
                                        <React.Fragment>
                                            {`${foodItem.time.getHours()}:${("0"+foodItem.time.getMinutes()).slice(-2)}` + ": "}{foodItem.details}
                                        </React.Fragment>
                                    }
                                    />
                            </ListItem>)
                            }
                            </List>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            )}
        </Timeline>
      </Paper>
      </Grid>
    )
}