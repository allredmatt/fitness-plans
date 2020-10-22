import { useState, useEffect, useContext }  from 'react';
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
import FoodCalendar                         from './foodCalendar.js';
import FitnessPlan                          from './fitnessPlan.js';
import {userContext}                        from '../context/checkUser.js'
import { EventRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container:{
    minWidth: 400,
  },
  headCard: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  bannerImage: {
    height: 150,
  },
  button: {
    margin: 2,
    left: 10,
  },
  switch: {
    left: 20,
  }
}));

export default function UserPage() {
  
  const classes = useStyles();

  const user = useContext(userContext)
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


  useEffect (()=> {
    //Add code to get data from server if Id changes

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
            })})
        setFitnessProgData(formattedFitnessData)
      })
      .catch(error => console.log(error))
  }, [user.name])

  const handleClick = () => {
    if(user.name === null && rememberId) {
        localStorage.setItem('UserId', textBoxValue);
    }
    user.setUserName(textBoxValue)
  };

  /*<FitnessPlan 
          fitnessData={fitnessProgData}
        />*/
  useEffect (()=> {
    //If foodData changes then re-render <FoodCalender /> page
    if(user.id != null){
      setAccountDetailsPage(
        <div>
        <FoodCalendar 
          userId={user.id} 
          foodData={foodCalenderData} 
          setFoodData={setFoodCalenderData}
        />
        
        </div> 
      )
    }
  }, [foodCalenderData, fitnessProgData])

  return (
    <div className={classes.container}>

      <Card className={classes.headCard}>
      <CardContent>
      <CardMedia
          className={classes.bannerImage}
          image="https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/06/Fitness_Class_1296x728-header-1.jpg?w=1155&h=1528"
          title="People squatting"
          />
          <Typography gutterBottom variant="h5" component="h2">
              Your personal plan and nutrition details
          </Typography>
          </CardContent>
      </Card>

      {user.id ?
      accountDetailsPage
      : 
      <Card className={classes.headCard}>
      <CardContent>
          <Typography gutterBottom variant="body1" color="textPrimary" component="p">
              Please log in to view your details
          </Typography>
          <TextField 
              id="outlined-basic"
              size="small"
              label="User ID" 
              variant="outlined"
              autoFocus={true}
              value={textBoxValue} 
              onChange={(event) => setTextBoxValue(event.target.value)}
              onKeyPress={(event) => {event.key === 'Enter' ? handleClick() : null}}
          />
          <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick} endIcon={<AccountCircleRoundedIcon />}>
              Login
          </Button><br />
          <FormControlLabel
              control={
              <Switch
                  checked={rememberId}
                  onChange={(event) => setRememberId(event.target.checked)}
                  color="primary"
              />
              }
              label="Remember Me"
              />
          <Typography variant="body2" color="textSecondary" component="p">
              If you chose to remember your ID, then you agree to this website storing this ID on your computer (do not use on shared computers).
          </Typography>
      </CardContent>
      </Card>
      }
    </div>
  );
}