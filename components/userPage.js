import { useState, useEffect }              from 'react';
import { makeStyles }                       from '@material-ui/core/styles';
import Card                                 from '@material-ui/core/Card';
import CardContent                          from '@material-ui/core/CardContent';
import Typography                           from '@material-ui/core/Typography';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid'
import FoodCalendar                         from './foodPage/foodCalendar.js';
import FoodFeedback                         from './foodFeedback'
import FitnessPlan                          from './fitnessPage/fitnessPlan.js';
import AllSessions                          from './allSessions'
import * as serverFetch                     from './serverFetch'


const useStyles = makeStyles((theme) => ({
  container:{
    flexGrow: 1,
    backgroundColor: theme.palette.primary.dark,
  },
  bottomMargin:{
    marginBottom: theme.spacing(0.1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    //padding: 'auto',
    backgroundColor: theme.palette.primary.main,
    minHeight: "35px",
    height: '100%'
  },
  iframePaper: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
  },
  iframe:{
    width: '100%',
    border: 0,
    minHeight: '50vh'
  }
}));

export default function UserPage({user, pageToShow, setPageToShow, setShowBackDrop}) {
  
  const classes = useStyles();
  
  const LoadingPage = () => 
    <Card className={classes.headCard}>
      <CardContent>
          <Typography gutterBottom variant="body1" color="textPrimary" component="p">
              You are logged in as user: <i>{user.name}  </i>loading your data...
          </Typography>
      </CardContent>
    </Card>

  const [foodCalenderData, setFoodCalenderData] = useState();
  const [fitnessSessionList, setFitnessSessionList] = useState();
  const [accountDetailsPage, setAccountDetailsPage] = useState(<LoadingPage />)

  useEffect (()=> {
    //On first load - check to see if a page have been loaded before
    if(localStorage.getItem('pageToShow') ){
      setPageToShow(localStorage.getItem('pageToShow'))
    } else {
      setShowBackDrop(false)
    }
  }, [])

  useEffect (()=> {
    setShowBackDrop(true)
    //If data changes then re-render sub-pages page.
    //Sets page to show when users changes page to show.
      switch(pageToShow){
        case "food":
          if(foodCalenderData) {
            setAccountDetailsPage(
              <FoodCalendar 
                user={user} 
                foodData={foodCalenderData} 
                setFoodData={setFoodCalenderData}
                setShowBackDrop={setShowBackDrop}
              />
            )
          } else {
            serverFetch.getFoodList(user.name)
              .then((data) => {
                let tempFoodData = data.map(entry => {
                    return(
                      {id: entry._id, details: entry.details, type: entry.type, time: new Date(entry.time)}
                    )
                })
                setFoodCalenderData(tempFoodData)
                setAccountDetailsPage(
                  <FoodCalendar 
                    user={user} 
                    foodData={tempFoodData} 
                    setFoodData={setFoodCalenderData}
                    setShowBackDrop={setShowBackDrop}
                  />
                )
              })
              .catch((error) => console.log("Error fetching food data:", error))
          }
          break;
        case "plan":
          if(fitnessSessionList){
            setAccountDetailsPage(
              <FitnessPlan 
                fitnessData={fitnessSessionList} user={user} setShowBackDrop={setShowBackDrop}
              />
            )
          } else {
            serverFetch.getSessionList(user.name)
              .then((data) => {
                setFitnessSessionList(data)
                setAccountDetailsPage(
                  <FitnessPlan 
                    fitnessData={data} user={user} setShowBackDrop={setShowBackDrop}
                  />
                )
              })
              .catch((error) => console.log("Error fetching fitness plan data:", error))
          }
          break;
        case "whole":
          if(fitnessSessionList){
            setAccountDetailsPage(
              <AllSessions 
                fitnessData={fitnessSessionList} setShowBackDrop={setShowBackDrop}
              />
            )
          } else {
            serverFetch.getSessionList(user.name)
              .then((data) => {
                setFitnessSessionList(data)
                setAccountDetailsPage(
                  <AllSessions 
                    fitnessData={data} setShowBackDrop={setShowBackDrop}
                  />
                )
              })
              .catch((error) => console.log("Error fetching fitness plan data:", error))
          }
          break;
        case 'feedback':
          setAccountDetailsPage(<FoodFeedback user={user} />)
          setShowBackDrop(false)
          break
        default:
          setShowBackDrop(false)
          setAccountDetailsPage(null)
      }
      localStorage.setItem('pageToShow', pageToShow);
  }, [pageToShow, foodCalenderData])


  return (
    <div className={classes.container}>
      <Grid container spacing={3} alignItems="stretch" className={classes.bottomMargin} >
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper} button="true" onClick={() => setPageToShow("food")}>
          <Typography variant="h5" color="secondary">Food Diary</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper} button="true" onClick={() => setPageToShow("feedback")}>
          <Typography variant="h5" color="secondary">Food Feedback</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper} button="true" onClick={() => setPageToShow("plan")}>
          <Typography variant="h5" color="secondary">Daily Plan</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper} button="true" onClick={() => setPageToShow("whole")}>
          <Typography variant="h5" color="secondary">Overall Plan</Typography>
          </Paper>
        </Grid>  
      </Grid>
      {accountDetailsPage}
    </div>
  );
}