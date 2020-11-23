import { useState, useEffect, useContext }  from 'react';
import FoodDisplay                          from './foodDisplay'
import FitDisplay                           from './fitnessDisplay'
import { addUser }                          from './serverChanges'
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    gridPaper:{
        padding: theme.spacing(1),
        height: "100%"
    },
    gridPaperFlex:{
        display: 'flex',
        padding: theme.spacing(1),
        height: "42px",
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
        webkitUserSelect: "none",  
        mozUserSelect: "none",    
        msUserSelect: "none",      
        userSelect: "none",
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
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

    useEffect(()=>{
        switch(selectedTab) {
            case 0:
                setTabContents(<FoodDisplay foodData={foodCalenderData}/>)
                break
            case 1:
                setTabContents(<FitDisplay fitData={fitnessProgData} setFitData={setFitnessProgData} userId={userDatabaseIdLookup(userSelectBox)}/>)
                break
            case 2:
                setTabContents(<p>This page is work in progress.</p>)
                break
            default:
                setTabContents(null)
        }
    }, [selectedTab, fitnessProgData])

    const handleSelectChange = (event) => {
        setIsBackDropOpen(true)
        setUserSelectBox(event.target.value)
        //add code here to change user data fetch from server
        fetch(`/api/food?id=${event.target.value}`,)
            .then(response => response.json())
            .then(data => {
                let formattedFoodData = data.findId?.fooddiary?.data.map((entry) => {return({id: entry._id, details: entry.details, type: entry.type, time: new Date(entry.time*1000)})})
                setFoodCalenderData(formattedFoodData)
                setFitnessProgData(data.findId?.fitnessplan?.data)
                setIsBackDropOpen(false)
            })
            .catch(error => {
                setIsBackDropOpen(false)
                console.log(error)
            })
    }

    const userDatabaseIdLookup = (userIdToFind) => {
        const index = userList?.findIndex((user) => user.UserId === userIdToFind)
        return userList[index]._id
    }

    const addNewUserToServer = (newUserName) => {
        addUser(newUserName)
        .then((data) => setUserList([...userList, {UserId: newUserName, _id: data.id}]))
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
            <Button onClick={() => setNewUserDialog({isOpen: false})} variant="outlined" color="primary">
                Cancel
            </Button>
            <Button onClick={() => addNewUserToServer(inputValue)} variant="outlined" color="primary" autoFocus>
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
        </div>
        <div className={classes.rootDiv}>
            <Grid container className={classes.gridRoot} spacing={2}>
                <Grid item xs={12} className={classes.gridItem}>
                    <Paper className={classes.gridPaperFlex}>
                        <Grid item xs={7} className={classes.gridFlex}>
                        <Button 
                            variant="outlined"
                            color="primary"
                            onClick={() => setNewUserDialog({isOpen: true})}
                        >New User</Button>
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
                            {userList.map((user) => <MenuItem key={user._id} value={user.UserId}>{user.UserId}</MenuItem>)}
                        </Select>
                        </Grid>
                        <Grid item xs={5}>
                        <Tabs
                            value={selectedTab}
                            onChange={(event, newValue) => setSelectedTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
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