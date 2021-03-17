import { useState, useEffect, useContext }  from 'react';
import FoodDisplay                          from './foodDisplay'
import FitDisplay                           from './fitnessDisplay'
import FoodFeedbackInput                    from './foodFeedback'
import { makeStyles, withStyles }           from '@material-ui/core/styles';
import Card                                 from '@material-ui/core/Card';
import CardContent                          from '@material-ui/core/CardContent';
import Typography                           from '@material-ui/core/Typography';
import CardMedia                            from '@material-ui/core/CardMedia';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid'
import Select                               from '@material-ui/core/Select'
import MenuItem                             from '@material-ui/core/MenuItem';
import InputBase                            from '@material-ui/core/InputBase';
import Tabs                                 from '@material-ui/core/Tabs';
import Tab                                  from '@material-ui/core/Tab';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogContentText                    from '@material-ui/core/DialogContentText';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import AppBar                               from '@material-ui/core/AppBar';
import Toolbar                              from '@material-ui/core/Toolbar';
import Backdrop                             from '@material-ui/core/Backdrop';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import * as fetchServer                     from '../../components/serverFetch'
import Divider                              from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
    gridPaper:{
        padding: theme.spacing(1),
        height: "100%"
    },
    gridPaperFlex:{
        display: 'flex',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    gridFlex:{
        display: 'flex',
        padding: theme.spacing(1),
        height: "42px",
    },
    rootDiv:{
        width:'99%',
        margin: '1.5% 1%',
        minWidth: "1120px",
    },
    gridRoot: {
        flexGrow: 1,
        width: '100%',
      },
    gridItem:{
        marginBottom: theme.spacing(1),
    },
    typographyPadding: {
        paddingTop: theme.spacing(0.1),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    header: {
        width: "100%",
        minWidth: "1120px",
        backgroundColor: theme.palette.primary
    },
    title: {
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    backColour:{
        backgroundColor: theme.palette.text.primary,
      }
}));


export default function AuthedArea({userList, setUserList}) {
    
    const BootstrapInput = withStyles((theme) => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(1),
          },
        },
        input: {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          width: '150px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }))(InputBase);


    const [userSelectBox, setUserSelectBox] = useState("")
    const [selectedTab, setSelectedTab] = useState()
    const [foodCalenderData, setFoodCalenderData] = useState()
    const [fitnessProgData, setFitnessProgData] = useState()
    const [newUserDialog, setNewUserDialog] = useState({isOpen: false})
    const [isBackDropOpen, setIsBackDropOpen] = useState(false)
    const [tabContents, setTabContents] = useState(null)

    const classes = useStyles();

    const blankSession = {
        _id: "noIdYet",
        sessionTitle: "New Session",
        shortTitle: "New",
        isNew: true, 
    }

    useEffect(()=>{
        setIsBackDropOpen(true)
        switch(selectedTab) {
            case 0:
                if(foodCalenderData) {
                    setTabContents(<FoodDisplay foodData={foodCalenderData} setIsBackDropOpen={setIsBackDropOpen}/>)
                    setIsBackDropOpen(false)
                } else {
                    fetchServer.getFoodList(userSelectBox)
                    .then(data => {
                        let formattedFoodData = data.map((entry) => {return({id: entry._id, details: entry.details, type: entry.type, time: new Date(entry.time)})})
                        setTabContents(<FoodDisplay foodData={formattedFoodData} setIsBackDropOpen={setIsBackDropOpen}/>)
                        setFoodCalenderData(formattedFoodData)
                        setIsBackDropOpen(false)
                    })
                    .catch(error => {
                        setIsBackDropOpen(false)
                        console.log(error)
                    })
                }   
                break
            case 1:
                if(fitnessProgData){
                    if(fitnessProgData[fitnessProgData.length - 1].isNew){
                        setTabContents(<FitDisplay sessionServerData={fitnessProgData} setSessionServerData={setFitnessProgData} user={{name: userSelectBox, ...userDatabaseIdLookup(userSelectBox)}} setIsBackDropOpen={setIsBackDropOpen}/>)
                        setIsBackDropOpen(false)
                    } else {
                        setFitnessProgData(fitnessProgData.concat([{...blankSession}]))
                    }
                } else {
                    fetchServer.getSessionList(userSelectBox)
                    .then(data => {
                        let serverFitData = data
                        serverFitData.push({...blankSession})
                        setTabContents(<FitDisplay 
                                            sessionServerData={serverFitData} 
                                            setSessionServerData={setFitnessProgData} 
                                            user={{name: userSelectBox, ...userDatabaseIdLookup(userSelectBox)}} 
                                            setIsBackDropOpen={setIsBackDropOpen}
                                            />)
                        setFitnessProgData(serverFitData)
                        setIsBackDropOpen(false)
                    })
                    .catch(error => {
                        setIsBackDropOpen(false)
                        console.log(error)
                    })
                }
                break
            case 2:
                setTabContents(<FoodFeedbackInput user={{name: userSelectBox, ...userDatabaseIdLookup(userSelectBox)}} />)
                setIsBackDropOpen(false)
                break
            default:
                setTabContents(null)
                setIsBackDropOpen(false)
        }
    }, [selectedTab, fitnessProgData])

    useEffect(() => {
        setSelectedTab(null)
        setFoodCalenderData(null)
        setFitnessProgData(null)
    }, [userSelectBox])

    const handleSelectChange = (event) => {
        setUserSelectBox(event.target.value)
    }

    const userDatabaseIdLookup = (userIdToFind) => {
        const index = userList?.findIndex((user) => user.userId === userIdToFind)
        return {id: userList[index]._id, currentSession: userList[index].currentSession}
    }

    const addNewUserToServer = (newUserName) => {
        fetchServer.newUser(newUserName, "both")
        .then((data) => setUserList([...userList, {userId: newUserName, _id: data.id}]))
        setNewUserDialog({isOpen: false})
    }

    const NewUserDialog = () => {
        const [inputValue, setInputValue] = useState("")
        return(
            <Dialog
                open={newUserDialog.isOpen}
                onClose={() => setNewUserDialog({isOpen: false})}
            >
            <DialogTitle id="alert-dialog-title">{`Add New User`}</DialogTitle>
            <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please enter the ID you want to use for the new user.
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="new-user"
                    label="New User ID"
                    variant="outlined"
                    size="small"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setNewUserDialog({isOpen: false})} variant="outlined" >
                Cancel
            </Button>
            <Button onClick={() => addNewUserToServer(inputValue)} variant="outlined" autoFocus>
                Add
            </Button>
            </DialogActions>
        </Dialog>)
    }
    return (
        <div>
        <div className={classes.header}>
        <AppBar position='static'>
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
              Millers Admin Area
        </Typography>
        </Toolbar>
        </AppBar>
        <Divider className={classes.backColour}/>
        </div>
        <div className={classes.rootDiv}>
            <Grid container className={classes.gridRoot} spacing={2}>
                <Grid item xs={12} className={classes.gridItem}>
                    <Paper className={classes.gridPaperFlex}>
                        <Grid item xs={7} className={classes.gridFlex}>
                        <Button 
                            variant="outlined"
                            onClick={() => setNewUserDialog({isOpen: true})}
                        >
                            New User
                        </Button>
                        <Typography className={classes.typographyPadding}>or selected the user to change details of:</Typography>
                        <Select
                            labelId="user-select"
                            id="user-select"
                            variant="outlined"
                            size="small"
                            value={userSelectBox}
                            onChange={handleSelectChange}
                            input={<BootstrapInput />}
                            >
                            {userList.map((user) => <MenuItem key={user._id} value={user.userId}>{user.userId}</MenuItem>)}
                        </Select>
                        </Grid>
                        <Grid item xs={5}>
                        <Tabs
                            value={selectedTab}
                            onChange={(event, newValue) => setSelectedTab(newValue)}
                            centered
                        >
                            <Tab label="Food Info" />
                            <Tab label="Fitness Plan" />
                            <Tab label="Food Feedback" />
                        </Tabs>
                        </Grid>
                    </Paper>
                </Grid>
                {tabContents}
            </Grid>
            <NewUserDialog />
        </div>
        <Backdrop className={classes.backdrop} open={isBackDropOpen} >
            <CircularProgress color="inherit" />
        </Backdrop>
        </div>
    )
}