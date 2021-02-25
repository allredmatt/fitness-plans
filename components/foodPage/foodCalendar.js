import DatePicker               from './datepicker.js';
import { useState, useEffect }  from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon    from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon   from '@material-ui/icons/KeyboardArrowRight';
import KitchenIcon              from '@material-ui/icons/Kitchen';
import FitnessCenterIcon        from '@material-ui/icons/FitnessCenter';
import NotesIcon                from '@material-ui/icons/Notes';
import CardActions              from '@material-ui/core/CardActions';
import List                     from '@material-ui/core/List';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemText             from '@material-ui/core/ListItemText';
import ListItemAvatar           from '@material-ui/core/ListItemAvatar';
import Avatar                   from '@material-ui/core/Avatar';
import Divider                  from '@material-ui/core/Divider';
import Fab                      from '@material-ui/core/Fab';
import AddIcon                  from '@material-ui/icons/Add';
import DeleteForeverIcon        from '@material-ui/icons/DeleteForever';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import EditIcon                 from '@material-ui/icons/Edit';
import IconButton               from '@material-ui/core/IconButton';
import FormDialog               from './formDialog';
import Button                   from '@material-ui/core/Button';
import Snackbar                 from '@material-ui/core/Snackbar';
import * as serverFetch         from '../serverFetch'
import FoodListItem             from './foodListItem'


const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(1)
    },
    actions: {
        paddingLeft: theme.spacing(1),
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(-1),
        right: theme.spacing(0),
      },
    inputDialog: {
        width: '282px',
        marginBottom: theme.spacing(2),
    },
    timePicker:{
        marginBottom: theme.spacing(2)
    },
    dialog:{
        width: '282px'
    }
}));

export default function FoodCalendar ({user, foodData, setFoodData, setShowBackDrop}) {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState(new Date);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [currentDatesData, setCurrentDatesData] = useState([]);
    const [idOfFoodElementClicked, setIsFoodElementClicked] = useState(false)
    const [snackBarInfo, setSnackBarInfo] = useState({data: null, isOpen: false})
    
    //make an array of the dates that are contained in the data to display a tick in the calender picker screen.
    const datesWithInfo = foodData? Array.from(new Set(foodData.map((entry) => entry.time.toLocaleDateString()))) : "";
    
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    useEffect(() => {
        //Make an array and sort for all the time data that is contained in the food server data, so can render items in time order
        let times = foodData?.reduce((filtered, entry) => {
            if (entry.time.toLocaleDateString() === selectedDate.toLocaleDateString() && !filtered.includes(entry.time)) {
              filtered.push(entry.time);
            }
            return filtered;
          }, [])
        times?.sort()
        let currentDatesFoodData = [];
        //use sorted array to build a new array of food data in time order. Look into if this could be done at the server request level so remove this code.
        times?.map((timeElement) => {
            foodData.forEach((foodElement) => {
                if(foodElement.time === timeElement){
                    currentDatesFoodData.push({type: foodElement.type, time: foodElement.time, details: foodElement.details, id: foodElement.id})                  
                }
            })
        })
        setCurrentDatesData(currentDatesFoodData)
        setShowBackDrop(false)
    }, [selectedDate, foodData])

    const saveFormData = (formData) => {
        setShowBackDrop(true)
        if(idOfFoodElementClicked === false) {
            //Adds a new entry to food database
            serverFetch.newFood({...formData, id: user.id})
                .then((data) => {
                    setFoodData([...foodData, { ...formData, id: data.id }])
                    setShowBackDrop(false)
                }) //Updates local state with new id
                .catch(error => console.log('error', error));
        } else {
            //Updating a existing entry
            //Save To server
            serverFetch.modifyFood(formData.id, formData)
                .catch(error => console.log('error', error));
            //Update local state
            setFoodData(foodData.map((element) => element.id === formData.id? formData : element))
            setIsFoodElementClicked(false)
            setShowBackDrop(false)
        }
        
    }

    const handleListClick = (elementId) => {
        if (idOfFoodElementClicked === elementId){
            setIsFoodElementClicked(false)
        } else {
            setIsFoodElementClicked(elementId)
        }
    }

    const handleSnackBarClose = () => {
        setShowBackDrop(true)
        let id = snackBarInfo.data
        serverFetch.deleteFood(id)
            .then(() => {
                setFoodData(foodData.filter((element) => element.id != id))
                setShowBackDrop(false)
            })
            .catch(error => console.log('error', error));
        setSnackBarInfo({data: null, isOpen: false})
    }

    const deleteServerEntrySnackBar = (id) => {
        setSnackBarInfo({data: id, isOpen: true})
    }

    return(
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Food journal
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                    Please enter the meals you have eaten today. Use the notes section to add any other information, such as if you felt unusually hungary that day etc... Any training you did that day can also be input here.
                </Typography>
                <CardActions className={classes.actions}>
                    <KeyboardArrowLeftIcon onClick={() => setSelectedDate(addDays(selectedDate, -1))}/>
                    <DatePicker date={selectedDate} newDate={setSelectedDate} datesWithInfo={datesWithInfo}/>
                    <KeyboardArrowRightIcon onClick={() => setSelectedDate(addDays(selectedDate, 1))}/>
                </CardActions>
                <List className={classes.root}>
                    {currentDatesData.map((element) => 
                        <FoodListItem
                            key = {element.id}
                            currentId = {element.id}
                            handleListClick = {handleListClick}
                            foodElementClickedId = {idOfFoodElementClicked}
                            type={element.type}
                            primaryText = {`${element.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${element.type}`}
                            secondaryText = {element.details}
                            setFormDialogOpen = {setFormDialogOpen}
                            deleteServerEntry = {deleteServerEntrySnackBar}
                        />
                    )}
                <br /><br />
                <Fab color="primary" 
                    aria-label="add" 
                    className={classes.fab} 
                    onClick={() => {
                        setIsFoodElementClicked(false)
                        setFormDialogOpen(true)
                    }}
                >
                    <AddIcon />
                </Fab>

            </List>
            </CardContent>
            <FormDialog 
                open={formDialogOpen} 
                setOpen={setFormDialogOpen} 
                updateParentState={saveFormData} 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate}
                currentDatesData={currentDatesData}
                setCurrentDatesData={setCurrentDatesData}
                editElementId={idOfFoodElementClicked}
                setEditElementId={setIsFoodElementClicked}
                classes={classes}
            />
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={snackBarInfo.isOpen}
                onClose={() => setSnackBarInfo({data: null, isOpen: false})}
                message="Delete this item?"
                action={
                <React.Fragment>
                    <Button color="primary" size="small" onClick={handleSnackBarClose}>
                    YES
                    </Button>
                    <Button color="secondary" size="small" onClick={()=> setSnackBarInfo({data: null, isOpen: false})}>
                    NO
                    </Button>
                </React.Fragment>
                }
            />
        </Card>
    );
};