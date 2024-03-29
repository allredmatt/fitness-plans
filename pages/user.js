import UserPage from "../components/userPage.js";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getUserDBId } from "../components/serverFetch";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthedTopBar } from "../components/topbar";
import Paper from "@material-ui/core/Paper";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
  },
  headCard: {
    width: "100%",
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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
    color: "#fff",
  },
  backColour: {
    backgroundColor: theme.palette.primary.dark,
  },
  imageDiv: {
    width: "100%",
    height: "15vh",
    position: "relative",
  },
  topMargin: {
    marginTop: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserArea() {
  const classes = useStyles();

  const [userTextBoxValue, setUserTextBoxValue] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [user, setUser] = useState({ name: null, id: null, isLoggedIn: false });
  const [userAreaToDisplay, setUserAreaToDisplay] = useState();
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("UserId")) {
      fetchUserID(localStorage.getItem("UserId"));
    } else {
      setShowBackDrop(false);
    }
  }, []);

  const handleClick = () => {
    setShowBackDrop(true);
    fetchUserID(userTextBoxValue);
  };

  const fetchUserID = (name) => {
    getUserDBId(name)
      .then((response) => {
        if(response.hasOwnProperty('error')) {
          console.log(response.error)
          setIncorrectLogin(true)
          setShowBackDrop(false)
        }
        else {
          const responseData = response.data.queryUser[0]
          if (rememberId) {
            localStorage.setItem("UserId", name);
          }
          setUser({
            name: name,
            id: responseData.userID,
            isLoggedIn: true,
            currentSession: responseData.currentSession,
          });
        }
      })
      .catch((error) => setIncorrectLogin(true));
  };

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("pageToShow");
    setUser({ name: null, id: null, isLoggedIn: false });
  };

  const closeSnackBar = () => {
    setShowBackDrop(false)
    setIncorrectLogin(false)
  }

  return (
    <div className={classes.backColour}>
      <AuthedTopBar
        logout={handleLogout}
        setUserAreaToDisplay={setUserAreaToDisplay}
      />
      <div className={classes.imageDiv}>
        <Image
          objectFit="cover"
          src="/gym.webp"
          alt="Picture of gym equipment"
          layout="fill"
        />
      </div>
      <Paper className={classes.container} elevation={0}>
        {user.isLoggedIn ? (
          <UserPage
            user={user}
            pageToShow={userAreaToDisplay}
            setPageToShow={setUserAreaToDisplay}
            setShowBackDrop={setShowBackDrop}
          />
        ) : (
          <React.Fragment>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              Your personal plan and nutrition details
            </Typography>
            <Card className={classes.headCard}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  color="textSecondary"
                  component="p"
                >
                  Please log in to view your details
                </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="User ID"
                  variant="outlined"
                  autoFocus={true}
                  value={userTextBoxValue}
                  onChange={(event) => setUserTextBoxValue(event.target.value)}
                  onKeyPress={(event) => {
                    event.key === "Enter" ? handleClick() : null;
                  }}
                />
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={handleClick}
                  endIcon={<AccountCircleRoundedIcon />}
                >
                  Login
                </Button>
                <br />
                <FormControlLabel
                  control={
                    <Switch
                      checked={rememberId}
                      onChange={(event) => setRememberId(event.target.checked)}
                    />
                  }
                  label="Remember Me"
                />
              </CardContent>
            </Card>
            <Typography
              variant="h6"
              color="textPrimary"
              component="h6"
              className={classes.topMargin}
            >
              Privacy Information:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              If you chose to remember your ID, then you agree to this website
              storing this ID on your computer (do not use on shared computers).
              No personal data or third party cookies are stored on your device,
              no tracking or tracking cookies are used by this website.
            </Typography>
          </React.Fragment>
        )}
        <Snackbar
          open={incorrectLogin}
          autoHideDuration={3000}
          onClose={closeSnackBar}
        >
          <Alert onClose={closeSnackBar} severity="warning">
            This user does not exist, please try again.
          </Alert>
        </Snackbar>
      </Paper>
      <Backdrop className={classes.backdrop} open={showBackDrop}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
