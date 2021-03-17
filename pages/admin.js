import { useState, useEffect, useContext }  from 'react';
import AuthedArea                           from '../components/admin/authorised'
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
import Snackbar                             from '@material-ui/core/Snackbar';
import Backdrop                             from '@material-ui/core/Backdrop';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import Grid                                 from '@material-ui/core/Grid'
import Select                               from '@material-ui/core/Select'
import MenuItem                             from '@material-ui/core/MenuItem';
import {getUserList, adminLogin}            from '../components/serverFetch'

const useStyles = makeStyles((theme) => ({

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container:{
        width: '97%',
        margin: '1.5% 1.5% -2%',
        padding: theme.spacing(2),
        minHeight: '95vh',
        backgroundColor: theme.palette.primary.light
    },
    colourBackground:{
        backgroundColor: theme.palette.primary.dark,
        minHeight: '98vh',
    },
    flexDiv:{
        display: 'flex'
    },
    leftMargin:{
        marginLeft: theme.spacing(1)
    }
}));

export default function Admin () {
    const classes = useStyles();
    const [authResult, setAuthResult] = useState(false)
    const [passwordTextInput, setPasswordTextInput] = useState("")
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [userList, setUserList] = useState([])
    
    useEffect(() => {
        if(document.cookie){
            const cookieObj = document.cookie.split(/[;] */).reduce(function(result, pairStr) {
                var arr = pairStr.split('=');
                if (arr.length === 2) { result[arr[0]] = arr[1]; }
                return result;
              }, {})
            if (cookieObj?.isAuth){
                setAuthResult(true)
                fetchUserListFromAPI()
            }
        }
    }, [])
    
    const checkNewPassword = () => {
        setBackdropOpen(true)
        adminLogin(passwordTextInput)
            .then(data => {
                setAuthResult(data.isAuth)
                if (data.isAuth === false){
                    setSnackBarOpen(true)
                    setPasswordTextInput("")
                    setBackdropOpen(false)
                } else {
                    fetchUserListFromAPI()
                }
            })
            .catch(error => {
                console.log('error', error)
                setSnackBarOpen(true) 
                setBackdropOpen(false)
            });
    }

    const fetchUserListFromAPI = () => {
        
        getUserList()
            .then(data => setUserList(data))
            .catch(error => {
                console.log('error', error)
            });
    }

    if(authResult){
        return (
            <div className={classes.colourBackground}>
                <AuthedArea userList={userList} setUserList={setUserList}/>
            </div>
        )
    } else {
        return (
            <div>
                <Paper className={classes.container} elevation={2}>
                    <Typography gutterBottom variant="h5" component="h2" color="textPrimary">Admin Login</Typography> 
                    <div className={classes.flexDiv}> 
                        <TextField
                            id="password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            size="small"
                            value={passwordTextInput}
                            onChange={(event) => setPasswordTextInput(event.target.value)}
                        />
                        <Button variant="outlined" onClick={checkNewPassword} className={classes.leftMargin}>Log In</Button>
                    </div> 
                </Paper>
                <Snackbar 
                    open={snackBarOpen} 
                    AutoHideDuration={2000} 
                    onClose={() => {setSnackBarOpen(false)}} 
                    message="Log in unsuccessful"
                    color="rgb(255, 152, 0)"
                />
                <Backdrop className={classes.backdrop} open={backdropOpen} >
                    <CircularProgress color="primary" />
                </Backdrop>
            </div>
        )
    }
}