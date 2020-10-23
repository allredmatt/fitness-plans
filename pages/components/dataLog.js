import { useState, useEffect }  from "react";
import { makeStyles }           from '@material-ui/core/styles';
import Accordion                from '@material-ui/core/Accordion';
import AccordionSummary         from '@material-ui/core/AccordionSummary';
import AccordionDetails         from '@material-ui/core/AccordionDetails';
import Typography               from '@material-ui/core/Typography';
import ExpandMoreIcon           from '@material-ui/icons/ExpandMore';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  }                             from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1)
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
      flexDirection: 'column'
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
},
}));

export default function DataLog ({fitnessData}) {

    const classes = useStyles();

    const [allUserData, setAllUserData] = useState([])

    useEffect(() => {

        if(fitnessData) {
            
            let setOfCardIds = new Set(); //Use to form a set of Ids so not have repeats of data.
            let tempCardData = [];
            fitnessData.forEach((element) => element?.cardInfo?.forEach((card) => {
                if(!setOfCardIds.has(card._id)){ //Check if already added to set - if so ignore and don't add to Array
                    setOfCardIds.add(card._id)
                    if(card.inputDataTypes.length != 0){ //Check that there is some data to build a chart from
                        tempCardData.push({
                            id: card._id, 
                            title: card.cardTitle, 
                            units: card.inputDataTypes, 
                            inputData: JSON.parse(card.inputData), 
                            listOfActivities: card.listOfActivities,
                        })
                    }
                }
            }));
            setAllUserData(tempCardData)
        }
    }, [fitnessData])

    if(allUserData.length === 0){
        return (null)
    } else {
    return ( 
        <div className={classes.root}>
            <Card className={classes.card} key={"workout-history"}>
                <CardContent >
                    <Typography gutterBottom variant="subtitle2" component="span">
                        Previous workouts
                    </Typography>
                    {allUserData?.map((element) =>
                        <Accordion key={element.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{element.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accord}>
                            <Typography  gutterBottom variant="subtitle1">
                            Details of workout:
                            {element.listOfActivities?.map((activity) => {
                                const activityObject = JSON.parse(activity)
                                return(
                                    <div className={classes.flex}>
                                        <Typography variant="body1" color="textPrimary">
                                            {activityObject.primary}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" className={classes.padLeft}>
                                            {activityObject.secondary}
                                        </Typography>
                                    </div>)
                                }
                            )}
                            </Typography>
                            <div className={classes.chartDiv}>
                            <br />
                            <Chart data={element.inputData} units={element.units}/>
                            </div>
                        </AccordionDetails>
                        </Accordion>
                        )} 
                </CardContent>
            </Card>          
        </div>
    )
}
}


function Chart ({data, units}) {

    let maxValue;
    units.forEach((unit) => {
        data.forEach((datum) => {
            console.log(unit)
            maxValue = maxValue >= parseInt(datum[unit]) ? maxValue : parseInt(datum[unit])
        })
    })

    const colorArray = ['#FF6633', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
          '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
        ];
    
    return (
    <ResponsiveContainer width="100%" minHeight={200}>
    <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
        top: 5, right: 30, left: 10, bottom: 5,
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis domain={[0, maxValue]} />
        <Tooltip />
        {units.map((unit, index) => <Line type="monotone" dataKey={unit} stroke={colorArray[index]} />)}
        <Legend />
    </LineChart>
    </ResponsiveContainer>
    )
}