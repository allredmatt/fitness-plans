import { useState, useEffect }              from 'react';
import { makeStyles }                       from '@material-ui/core/styles';
import Card                                 from '@material-ui/core/Card';
import CardContent                          from '@material-ui/core/CardContent';
import Typography                           from '@material-ui/core/Typography';
import CardMedia                            from '@material-ui/core/CardMedia';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import AccountCircleRoundedIcon             from '@material-ui/icons/AccountCircleRounded';
import Switch                               from '@material-ui/core/Switch';
import FormControlLabel                     from '@material-ui/core/FormControlLabel';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid'
import FoodCalendar                         from './foodCalendar.js';
import FitnessPlan                          from './fitnessPlan.js';
import DataLog                              from './dataLog';
import AllSessions                          from './allSessions'


const useStyles = makeStyles((theme) => ({
  container:{
    flexGrow: 1,
  },
  bottomMargin:{
    marginBottom: theme.spacing(0.1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.main,
    minHeight: "35px"
  },
}));

export default function UserPage({user, pageToShow, setPageToShow}) {
  
  const classes = useStyles();

  const [textBoxValue, setTextBoxValue] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [foodCalenderData, setFoodCalenderData] = useState();
  const [fitnessProgData, setFitnessProgData] = useState([]);
  const [accountDetailsPage, setAccountDetailsPage] = useState(
                                                                <Card className={classes.headCard}>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                                                                        You are logged in as user: <i>{user.name}  </i>loading your data...
                                                                    </Typography>
                                                                </CardContent>
                                                                </Card>)

  const fetchServerData = () => {
      fetch(`/api/food?id=${user.name}`,)
      .then(response => response.json())
      .then(data => {
        let formattedFoodData = data.findId?.fooddiary?.data.map((entry) => {return({id: entry._id, details: entry.details, type: entry.type, time: new Date(entry.time*1000)})})
        setFoodCalenderData(formattedFoodData)
        let formattedFitnessData = data.findId?.fitnessplan?.data.map((entry) => {
          return(
            {
              id: entry._id, 
              isCurrent: entry.isCurrent, 
              sessionTitle: entry.sessionTitle,
              cardInfo: entry.cardInfo.data,
              shortTitle: entry.shortTitle
            })})
        setFitnessProgData(formattedFitnessData)
      })
      .catch(error => console.log(error))

      //Check local storage to see if page has been loaded before and set pageToShow to persist correct area.
      if(localStorage.getItem('pageToShow') ){
        setPageToShow(localStorage.getItem('pageToShow'))
      }
  }

  useEffect (()=> {
    //On first load - fetch data from server
    fetchServerData()
  }, [])

  useEffect (()=> {
    //If data changes then re-render sub-pages page.
    //Sets page to show when users changes page to show.
      switch(pageToShow){
        case "food":
          setAccountDetailsPage(
            <FoodCalendar 
              userId={user.id} 
              foodData={foodCalenderData} 
              setFoodData={setFoodCalenderData}
            />
          )
          break;
        case "plan":
          setAccountDetailsPage(
            <FitnessPlan 
                    fitnessData={fitnessProgData} reloadData={fetchServerData}
                  />
          )
          break;
        case "whole":
          setAccountDetailsPage(
            <AllSessions 
                    fitnessData={fitnessProgData}
                  />
          )
          break;
        default:
          setAccountDetailsPage(null)
      }
      localStorage.setItem('pageToShow', pageToShow);
  }, [foodCalenderData, fitnessProgData, pageToShow])


  return (
    <div className={classes.container}>
      <Grid container spacing={3} className={classes.bottomMargin}>
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} button="true" onClick={() => setPageToShow("food")}>
            <Typography variant="h5">Food Diary</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} button="true" onClick={() => setPageToShow("feedback")}>
            <Typography variant="h5">Food Feedback</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} button="true" onClick={() => setPageToShow("plan")}>
            <Typography variant="h5">Daily Plan</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} button="true" onClick={() => setPageToShow("whole")}>
            <Typography variant="h5">Overall Plan</Typography>
            </Paper>
          </Grid>  
      </Grid>
      {accountDetailsPage}
    </div>
  );
}