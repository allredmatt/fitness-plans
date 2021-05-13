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
import { Backdrop } from '@material-ui/core';
import { Opacity, SportsRugbySharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  container:{
    flexGrow: 1,
    backgroundColor: theme.palette.primary.dark,
  },
  bottomMargin:{
    marginBottom: theme.spacing(0.1)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    //padding: 'auto',
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(1),
    position: 'relative',
  },
  iframePaper: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
  },
  iframe:{
    width: '100%',
    border: 0,
    minHeight: '50vh'
  },
  backDrop:{
    zIndex: theme.zIndex.appBar + 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  loadText:{
    position: 'fixed',
    top: 80,
    left: theme.spacing(5)
  },
  circle:{
    position: 'fixed',
    left: 2,
    top: 2,
    height: 70,
    width: 70,
    backgroundColor: theme.palette.primary.contrastText,
    opacity: 0.4,
    borderRadius: '50%',
    zIndex: theme.zIndex.appBar + 1
  }
}));

export default function UserPage({user, pageToShow, setPageToShow, setShowBackDrop}) {
  
  const classes = useStyles();
  
  const InitialLoad = () => {

    const [isOpen, setIsOpen] = useState(true)

    return(
    <Backdrop className={classes.backDrop} open={isOpen} onClick={() => setIsOpen(false)}>
      <Typography className={classes.loadText} variant="h6" color="textPrimary">
          Please use the menu bar to navigate the user area
      </Typography>
      <span className={classes.circle} />
    </Backdrop>
    )
  }

  const [foodCalenderData, setFoodCalenderData] = useState();
  const [fitnessSessionList, setFitnessSessionList] = useState();
  const [accountDetailsPage, setAccountDetailsPage] = useState(<InitialLoad />)

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
          setAccountDetailsPage(<InitialLoad />)
      }
      localStorage.setItem('pageToShow', pageToShow);
  }, [pageToShow, foodCalenderData])

  const pageName = (pageDisplayed) => {
    switch(pageDisplayed){
      case 'food':
        return 'Food Journal'
      case 'plan':
        return 'Fitness Plan'
      case 'whole':
        return 'Overall Plan'
      case 'feedback':
        return 'Food Feedback'
    }
  }


  return (
    <div className={classes.container}>
      <Grid container spacing={3} alignItems="stretch" className={classes.bottomMargin} >
        <Grid item >
          <Paper className={classes.paper} >
          <Typography variant="h4" color="secondary">{
            pageName(pageToShow)
          }</Typography>
          </Paper>
        </Grid>
      </Grid>
      {accountDetailsPage}
    </div>
  );
}