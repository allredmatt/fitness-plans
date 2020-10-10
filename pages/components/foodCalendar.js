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


export const useStyles = makeStyles((theme) => ({
    card: {
        width: '98%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(1)
    },
    actions: {
        paddingLeft: theme.spacing(1),
    },
    root: {
        width: '98%',
        backgroundColor: theme.palette.background.paper,
      },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(-1),
        right: theme.spacing(0),
      },
    inputDialog: {
        minWidth: '282px',
        marginBottom: theme.spacing(2),
    }
}));

export default function FoodCalendar ({userId, foodData, setFoodData}) {
    const classes = useStyles();
    const theme = useTheme();

    const [selectedDate, setSelectedDate] = useState(new Date);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [currentDatesData, setCurrentDatesData] = useState({food: [], notes: null, training: null});
    const [isFoodElementClicked, setIsFoodElementClicked] = useState(false)
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
        let notes = {};
        let training = {};
        //use sorted array to build a new array of food data in time order. Look into if this could be done at the server request level so remove this code.
        times?.map((timeElement) => {
            foodData.forEach((foodElement) => {
                if(foodElement.time === timeElement){
                    console.log(foodElement)
                    if(!(foodElement.type === "Notes" || foodElement.type === "Training")){
                        currentDatesFoodData.push({type: foodElement.type, time: foodElement.time, details: foodElement.details, id: foodElement.id})                  
                    } else if(foodElement.type === "Notes") {
                            notes = {details: foodElement.details, id: foodElement.id} 
                        }
                        else {
                            training = {details: foodElement.details, id: foodElement.id}
                        }
                    }
                }
            )
        })
        setCurrentDatesData({food: currentDatesFoodData, training: training, notes: notes})
    }, [selectedDate, foodData])

    const saveFormData = ({type, time, details, id}) => {
        if(isFoodElementClicked === false) {
            let newEntry = {type: type, time: time, details: details, id: id};
            setFoodData(foodData.concat(newEntry)) 
        } else {
            setFoodData(foodData.map((element) => element.id === id? {type: type, time: time, details: details, id: id}: element))
            setIsFoodElementClicked(false)
        }
    }

    const handleListClick = (elementId) => {
        if (isFoodElementClicked === elementId){
            setIsFoodElementClicked(false)
        } else {
            setIsFoodElementClicked(elementId)
        }
    }

    const handleSnackBarClose = () => {
        let id = snackBarInfo.data
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({"DeleteId":id});
        const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("/api/user", requestOptions)
            .then(setFoodData(foodData.filter((element) => element.id != id)))
            .catch(error => console.log('error', error));
        
        setSnackBarInfo({data: null, isOpen: false})
    }

    const deleteServerEntry = (id) => {
        setSnackBarInfo({data: id, isOpen: true})
    }

    return(
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Food journal
                </Typography>
                <CardActions className={classes.actions}>
                    <KeyboardArrowLeftIcon onClick={() => setSelectedDate(addDays(selectedDate, -1))}/>
                    <DatePicker date={selectedDate} newDate={setSelectedDate} datesWithInfo={datesWithInfo}/>
                    <KeyboardArrowRightIcon onClick={() => setSelectedDate(addDays(selectedDate, 1))}/>
                </CardActions>
                <List className={classes.root}>

                {currentDatesData.food.map((element) => 
                    <ListItem key={element.id} alignItems="flex-start" onClick={() => handleListClick(element.id)} button>
                        <ListItemAvatar>
                        <Avatar>
                            <KitchenIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={element.type}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {`${element.time.getHours()}:${("0"+element.time.getMinutes()).slice(-2)}` + ": "}
                                </Typography>
                                {element.details}
                                </React.Fragment>
                            }
                            />
                            {isFoodElementClicked === element.id ? 
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => setFormDialogOpen(true)}>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteServerEntry(element.id)}>
                                        <DeleteForeverIcon color="primary"/>
                                    </IconButton>
                                </ListItemSecondaryAction> 
                                : null}
                    </ListItem>
                )}
                
                {(Boolean(currentDatesData.training?.id) || Boolean(currentDatesData.notes?.id)) && <Divider />}
                
                {Boolean(currentDatesData.training?.id) && 
                    <ListItem key={currentDatesData.training.id} alignItems="flex-start" button onClick={() => handleListClick(currentDatesData.training.id)}>
                        <ListItemAvatar>
                        <Avatar>
                            <FitnessCenterIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={"Training"}
                            secondary={
                                <React.Fragment>
                                    {currentDatesData.training.details}
                                </React.Fragment>
                            }
                            />
                        {isFoodElementClicked === currentDatesData.training.id ? 
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => setFormDialogOpen(true)}>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteServerEntry(currentDatesData.training.id)}>
                                        <DeleteForeverIcon color="primary"/>
                                    </IconButton>
                                </ListItemSecondaryAction> 
                                : null}
                    </ListItem>}

                {Boolean(currentDatesData.notes?.id) && 
                    <ListItem key={currentDatesData.notes.id} alignItems="flex-start" button onClick={() => handleListClick(currentDatesData.notes.id)} >
                        <ListItemAvatar>
                        <Avatar>
                            <NotesIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={"Notes"}
                            secondary={
                                <React.Fragment>
                                    {currentDatesData.notes.details}
                                </React.Fragment>
                            }
                            />
                            {isFoodElementClicked === currentDatesData.notes.id ? 
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => setFormDialogOpen(true)}>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteServerEntry(currentDatesData.notes.id)}>
                                        <DeleteForeverIcon color="primary"/>
                                    </IconButton>
                                </ListItemSecondaryAction> 
                                : null}
                    </ListItem>}
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
                saveFormData={saveFormData} 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate}
                currentDatesData={currentDatesData}
                setCurrentDatesData={setCurrentDatesData}
                userId={userId}
                editElementId={isFoodElementClicked}
                setEditElementId={setIsFoodElementClicked}
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