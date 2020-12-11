import Paper from '@material-ui/core/Paper';
import DataLog from "./dataLog";
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect }  from "react";
import useMediaQuery            from '@material-ui/core/useMediaQuery';
import Accordion                from '@material-ui/core/Accordion';
import AccordionSummary         from '@material-ui/core/AccordionSummary';
import AccordionDetails         from '@material-ui/core/AccordionDetails';
import Typography               from '@material-ui/core/Typography';
import ExpandMoreIcon           from '@material-ui/icons/ExpandMore';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import List                     from '@material-ui/core/List';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import ListItemText             from '@material-ui/core/ListItemText';
import YouTubeIcon              from '@material-ui/icons/YouTube';
import Button                   from '@material-ui/core/Button';
import CardActions              from '@material-ui/core/CardActions';
import TextField                from '@material-ui/core/TextField';
import InputAdornment           from '@material-ui/core/InputAdornment';
import IconButton               from '@material-ui/core/IconButton';
import Divider                  from '@material-ui/core/Divider';


export default function AllSessions ({fitnessData}) {
    
    const minWidth700 = useMediaQuery('(min-width:700px)');

    const useStyles = makeStyles((theme) => ({
        bottomMargin:{
            marginBottom: theme.spacing(0.1)
        },
        paper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1)
        },
        root: {
            width: '100%',
            marginBottom: theme.spacing(2)
            },
            heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            },
            flex: {
            display: 'flex',
            paddingLeft: theme.spacing(1),
            width: '100%',
            flexGrow: '1'
            },
            padLeft:{
            paddingLeft: theme.spacing(1)
            },
            chartDiv: {
            width: '100%',
            flexGrow: '1'
            },
            accord: {
                display: 'flex',
                flexDirection: minWidth700? "row" : "column",
                minWidth: '180px'
            },
            card: {
            backgroundColor: theme.palette.background.paper,
            margin: theme.spacing(1),
        },
        }));


    const classes = useStyles();

    let cardData = fitnessData[0]?.cardInfo[0] || null

    return (
        <Paper className={classes.paper}>

            <Typography gutterBottom variant="h5" component="h2"> 
              All your workout session and logged data
            </Typography>
            <AllSessionList fitnessData={fitnessData} classes={classes}/>
            <DataLog fitnessData={fitnessData} />
        </Paper>
    )
}

function AllSessionList ({fitnessData, classes}) {

    return(
        <div className={classes.root}>
                    <Typography gutterBottom variant="subtitle2" component="span">
                        All your workout sessions
                    </Typography>
                    {fitnessData?.map((element) =>
                        <Accordion key={element.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-content"
                            id="panel-header"
                        >
                            <Typography className={classes.heading}>{element.sessionTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accord}>
                               { element.cardInfo.map((cardData, index) => 
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
                               </CardContent>
                           </Card>
                               )}
                        </AccordionDetails>
                        </Accordion>
                        )}         
        </div>
    )
}