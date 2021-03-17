import Paper                    from '@material-ui/core/Paper';
import DataLog                  from "./fitnessPage/dataLog";
import { makeStyles }           from '@material-ui/core/styles';
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
import Tabs                     from '@material-ui/core/Tabs';
import Tab                      from '@material-ui/core/Tab';
import Box                      from '@material-ui/core/Box';
import UserFitnessPlan          from './fitnessPage/userFit'
import * as serverFetch         from './serverFetch'
import { getNullableType } from 'graphql';


export default function AllSessions ({fitnessData, setShowBackDrop}) {
    
    const minWidth1000 = useMediaQuery('(min-width:1000px)');
    const minWidth1300 = useMediaQuery('(min-width:1300px)')

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
            flexDirection: minWidth1300? "row" : "column",
            minWidth: '180px'
        },
        card: {
            backgroundColor: theme.palette.background.paper,
            margin: theme.spacing(1),
        },
        tabs:{
            minWidth: "130px"
        }
        }));


    const classes = useStyles();

    setShowBackDrop(false)
        //Add data log still
    return (
        <Paper className={classes.paper}>

            <Typography gutterBottom variant="h5" component="h2"> 
              All your workout session and logged data
            </Typography>
            <AllSessionList fitnessData={fitnessData} classes={classes} minWidthLarge={minWidth1000} minWidthXL={minWidth1300}/>
            <DataLog fitnessData={[]} />
        </Paper>
    )
}

function AllSessionList ({fitnessData, classes, minWidthLarge, minWidthXL}) {

    const [tabValue, setTabValue] = useState(0)
    const [currentFitnessPlan, setCurrentFitnessPlan] = useState()

    useEffect(()=> {
        //Load data for current session chosen by tab from Tabs
        serverFetch.getSessionById(fitnessData[tabValue]?._id)
            .then(data => {
                setCurrentFitnessPlan(data)
                setShowBackDrop(false)
            })
            .catch(error => console.log("Error fetching session data:", error))
    }, [tabValue])

    return(
        <div className={classes.accord}>
            <Tabs
                className={classes.tabs}
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}

                orientation={minWidthXL? "vertical" : "horizontal"}
                variant={minWidthXL? "scrollable" : "fullWidth" }
                aria-label="session tabs"
            >
                {fitnessData.map( (session, index) => 
                    <Tab label={session.sessionTitle} key={session._id} id={`tab-index-${index}`} aria-controls={`tab-panel-${session.shortTitle}`}/>
                )}
            </Tabs>
            <Divider orientation="vertical"/>
            <UserFitnessPlan 
                fitnessData={currentFitnessPlan}
                setFitnessData={setCurrentFitnessPlan} 
                userInputData={[]} 
                handleCardChange={() => null} 
                saveToInputToServer={() => null} 
                handleNextClick={() => null} 
                handlePreviousClick={() => null}
                flexDirection={minWidthLarge? "row" : "column"}
                allSessionsRendered={true}
            />
        </div>
    )
}