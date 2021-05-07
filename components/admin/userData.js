import { useEffect, useState }              from 'react'
import { getInputDataList }                 from '../serverFetch'
import { deleteUserData, modifyUserData }   from './serverChanges'
import { makeStyles }                       from '@material-ui/core/styles';
import Typography               from '@material-ui/core/Typography';
import Paper                    from '@material-ui/core/Paper';
import Timeline                 from '@material-ui/lab/Timeline';
import TimelineItem             from '@material-ui/lab/TimelineItem';
import TimelineSeparator        from '@material-ui/lab/TimelineSeparator';
import TimelineConnector        from '@material-ui/lab/TimelineConnector';
import TimelineContent          from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent  from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot              from '@material-ui/lab/TimelineDot';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemText             from '@material-ui/core/ListItemText';
import List                     from '@material-ui/core/List';
import Grid                     from '@material-ui/core/Grid'
import Tabs                     from '@material-ui/core/Tabs';
import Tab                      from '@material-ui/core/Tab';
import TextField                from '@material-ui/core/TextField'
import Fab                      from '@material-ui/core/Fab';
import SaveIcon                 from '@material-ui/icons/Save';
import DeleteIcon               from '@material-ui/icons/Delete';
import DataLog                  from '../fitnessPage/dataLog'
import { Dialog, DialogTitle, Button } from '@material-ui/core';
import { FormatColorResetOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
        gridPaper:{
            padding: theme.spacing(1),
            backgroundColor: theme.palette.primary.main,
            marginBottom: theme.spacing(2)
        },
        gridItem:{
            marginBottom: theme.spacing(1),
        },
        textArea:{
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(2),
            maxWidth: theme.spacing(50)
        },
        cardPaper:{
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            marginBottom: theme.spacing(2)
        },
        marginBottom:{
            marginBottom: theme.spacing(2)
        },
        marginRight:{
            marginRight: theme.spacing(2),
            backgroundColor: theme.palette.error.main
        },
        dialog:{
            padding: theme.spacing(2)
        }
    }));


export default function UserDataForm ({user}) {
    const classes = useStyles()

    const [userData, setUserData] = useState([])
    const [selectedTab, setSelectedTab] = useState(0)
    

    useEffect(()=>{
        if(user.name != undefined){
            getInputDataList(user.name)
            .then((data) => setUserData(data))
            .catch((error) => console.log(error))
        }
    },[])

    return (
        <Grid item xs={12} >
        <Paper className={classes.gridPaper}>
            <Tabs
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
            >
                {userData.map(data => <Tab key={data.customId} label={data.name} />)}
            </Tabs>
            {userData.length === 0? null : <UserForm userData={userData} selected={selectedTab} setSelected={setSelectedTab} classes={classes} setUserData={setUserData}/>}
        </Paper>
        </Grid>    
    )
}

function UserForm ({selected, userData, classes, setUserData, setSelected}) {

    const [formData, setFormData] = useState(userData[selected])
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    useEffect(() => {
        //useEffect to reload state if selected prop changes
        setFormData(userData[selected])
    }, [userData, selected])

    const submitToServer = () => {
        //Update parent state
        let copyOfUserDataToMutate = [...userData]
        //Make copy of data equal to form data state (that has been modified by user TextField)
        copyOfUserDataToMutate[selected] = formData
        setUserData(copyOfUserDataToMutate)
        //Update server with info
        modifyUserData(formData)
    }

    const deleteThisUserData = () => {
        setIsDeleteDialogOpen(false)
        //Change the tab that is selected as this one is about to be deleted. Only need to trigger if last item is one to be deleted
        if(userData.length === selected + 1){
            setSelected(selected - 1)
        }
        //Update parent state
        setUserData(userData.filter((data, index) => index !== selected))
        //update server
        deleteUserData(formData._id)
    }

    const DeleteConfirmDialog = () => 
        <Dialog 
            onClose={() => setIsDeleteDialogOpen(false)} 
            aria-labelledby="confirm delete dialog" 
            open={isDeleteDialogOpen}
            className={classes.dialog}
        >
            <DialogTitle id="confirm-delete">Confirm</DialogTitle>
            <Typography className={classes.dialog} color="textSecondary">Please confirm you want to delete. Ensure you have deleted the data from the fitness plan as well</Typography>
            <Button onClick={deleteThisUserData}>Delete</Button>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
        </Dialog>

    return(
        <div>
        <Paper className={classes.cardPaper}>
        <Typography className={classes.marginBottom} color="textSecondary">
            Edit details of User Data. Name is only visible to admin. Details is the title of the chart associated with this data.
        </Typography>
        {formData === undefined?
         null :
         <React.Fragment>
         <TextField
            id="data-name"
            label="Name"
            variant="outlined"
            size="small"
            className={classes.textArea}
            value={formData.name}
            onChange={(event) => setFormData({...formData, name: event.target.value})}
        />
        <TextField
            id="data-unit"
            label="Unit"
            variant="outlined"
            size="small"
            className={classes.textArea}
            value={formData.inputDataUnit}
            onChange={(event) => setFormData({...formData, inputDataUnit: event.target.value})}
        />
        <TextField
            id="data-details"
            label="Details"
            variant="outlined"
            size="small"
            className={classes.textArea}
            value={formData.details}
            onChange={(event) => setFormData({...formData, details: event.target.value})}
        />
        </React.Fragment>
        }
        <span>
        <Fab
            size="small"
            className={classes.marginRight}
            color="secondary"
            aria-label="delete"
            onClick={() => setIsDeleteDialogOpen(true)}
        >
            <DeleteIcon />
        </Fab>
        <Fab
            color="secondary"
            aria-label="save"
            onClick={submitToServer}
        >
             <SaveIcon />
        </Fab>
        </span>
        </Paper>
        <DeleteConfirmDialog />
        <Paper className={classes.cardPaper}>
            <DataLog key={formData.customId} customId={formData.customId}/>
        </Paper>
        </div>
    )
}