import Main                                     from '../components/pageWrapper.js'
import UserPage                                 from '../components/userPage.js'
import { useState, useEffect }                  from 'react';
import { makeStyles }                           from '@material-ui/core/styles';
import Card                                     from '@material-ui/core/Card';
import CardContent                              from '@material-ui/core/CardContent';
import Typography                               from '@material-ui/core/Typography';
import CardMedia                                from '@material-ui/core/CardMedia';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';
import AccountCircleRoundedIcon                 from '@material-ui/icons/AccountCircleRounded';
import Switch                                   from '@material-ui/core/Switch';
import FormControlLabel                         from '@material-ui/core/FormControlLabel';
import Snackbar                                 from '@material-ui/core/Snackbar';
import MuiAlert                                 from '@material-ui/lab/Alert';
import { getUserDBId }                          from '../components/serverFetch'
import Backdrop                                 from '@material-ui/core/Backdrop';
import CircularProgress                         from '@material-ui/core/CircularProgress';
import { AuthedTopBar }                         from '../components/topbar';
import Paper                                    from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  container:{
    minWidth: 400,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark
  },
  headCard: {
    width: '100%',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backColour:{
    backgroundColor: theme.palette.primary.dark
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserArea() {

  const classes = useStyles();

  const [textBoxValue, setTextBoxValue] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [user, setUser] = useState({name: null, id: null, isLoggedIn: false})
  const [userAreaToDisplay, setUserAreaToDisplay] = useState()
  const [incorrectLogin, setIncorrectLogin] = useState(false)
  const [showBackDrop, setShowBackDrop] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('UserId') ){
      fetchUserID(localStorage.getItem('UserId'))
    } else {
      setShowBackDrop(false)
    }
  }, [])

  const handleClick = () => {
    setShowBackDrop(true)
    fetchUserID(textBoxValue)
  };

  const fetchUserID = (name) => {
    getUserDBId(name)
      .then((data) => {
        if(rememberId) {
          localStorage.setItem('UserId', name);
        }
        setUser({name: name, id: data._id, isLoggedIn: true, currentSession: data.currentSession})
      })
      .catch((error) => setIncorrectLogin(true))
  }

  const handleLogout = () => {
    localStorage.removeItem('UserId')
    localStorage.removeItem('pageToShow')
    setUser({name: null, id: null, isLoggedIn: false})
  }

  return (
    <div className={classes.backColour}> 
      <AuthedTopBar logout={handleLogout} setUserAreaToDisplay={setUserAreaToDisplay}/>
      <Paper className={classes.container} elevation={0}>
          <Card className={classes.headCard}>
          <CardContent>
          <CardMedia
              className={classes.bannerImage}
              image="/gym.jpg"
              title="Empty Gym"
              />
              <Typography gutterBottom variant="h5" component="h2">
                  Your personal plan and nutrition details
              </Typography>
              </CardContent>
          </Card>

          {user.isLoggedIn ?
          <UserPage user={user} pageToShow={userAreaToDisplay} setPageToShow={setUserAreaToDisplay} setShowBackDrop={setShowBackDrop}/>
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
              <Button className={classes.button} variant="outlined" onClick={handleClick} endIcon={<AccountCircleRoundedIcon />}>
                  Login
              </Button><br />
              <FormControlLabel
                  control={
                  <Switch
                      checked={rememberId}
                      onChange={(event) => setRememberId(event.target.checked)}
                  />
                  }
                  label="Remember Me"
                  />
              <Typography variant="body1" color="textSecondary" component="p">
                  If you chose to remember your ID, then you agree to this website storing this ID on your computer (do not use on shared computers).
              </Typography>
          </CardContent>
          </Card>
          }
          <Snackbar open={incorrectLogin} autoHideDuration={3000} onClose={() => setIncorrectLogin(false)}>
          <Alert onClose={() => setIncorrectLogin(false)} severity="warning">
            This user does not exist, please try again.
          </Alert>
          </Snackbar>
        </Paper>
        <Backdrop className={classes.backdrop} open={showBackDrop} >
          <CircularProgress color="primary" />
        </Backdrop>
    </div>
  );
}