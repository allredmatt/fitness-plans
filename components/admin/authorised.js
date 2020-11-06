import { useState, useEffect, useContext }  from 'react';
import FoodDisplay                          from './foodDisplay'
import FitDisplay                           from './fitnessDisplay'
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
        paddingRight: theme.spacing(1)
    }
}));


export default function AuthedArea({userList}) {
    
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
    const [selectedTab, setSelectedTab] = useState(0)
    const [foodCalenderData, setFoodCalenderData] = useState()
    const [fitnessProgData, setFitnessProgData] = useState()

    const classes = useStyles();

    const handleSelectChange = (event) => {
        setUserSelectBox(event.target.value)
        //add code here to change user data fetch from server
        fetch(`/api/food?id=${event.target.value}`,)
            .then(response => response.json())
            .then(data => {
                let formattedFoodData = data.findId?.fooddiary?.data.map((entry) => {return({id: entry._id, details: entry.details, type: entry.type, time: new Date(entry.time*1000)})})
                setFoodCalenderData(formattedFoodData)
                setFitnessProgData(data.findId?.fitnessplan?.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={classes.rootDiv}>
            <Grid container className={classes.gridRoot} spacing={2}>
                <Grid item xs={12} className={classes.gridItem}>
                    <Paper className={classes.gridPaperFlex}>
                        <Grid item xs={8} className={classes.gridFlex}>
                        <Typography className={classes.typographyPadding}>Please selected the user to change details of:</Typography>
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
                        <Grid item xs={4}>
                        <Tabs
                            value={selectedTab}
                            onChange={(event, newValue) => setSelectedTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Food Info" />
                            <Tab label="Fitness Plan" />
                        </Tabs>
                        </Grid>
                    </Paper>
                </Grid>
                {(foodCalenderData || fitnessProgData) && 
                    <React.Fragment>
                        {selectedTab === 0? 
                        <FoodDisplay foodData={foodCalenderData}/> 
                        :
                        <FitDisplay fitData={fitnessProgData} setFitData={setFitnessProgData}/>}
                    </React.Fragment>
                }
            </Grid>
        </div>
    )
}