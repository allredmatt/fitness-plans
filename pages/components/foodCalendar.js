import DatePicker               from './datepicker.js';
import TimePicker               from './timepicker.js';
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
import Button                   from '@material-ui/core/Button';
import TextField                from '@material-ui/core/TextField';
import Dialog                   from '@material-ui/core/Dialog';
import DialogActions            from '@material-ui/core/DialogActions';
import DialogContent            from '@material-ui/core/DialogContent';
import DialogContentText        from '@material-ui/core/DialogContentText';
import DialogTitle              from '@material-ui/core/DialogTitle';
import Select                   from '@material-ui/core/Select';
import MenuItem                 from '@material-ui/core/MenuItem';
import DeleteForeverIcon        from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
    },
    actions: {
        paddingLeft: theme.spacing(1),
    },
    root: {
        width: '100%',
        maxWidth: 600,
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
    const [hasDoubleClicked, setHadDoubledClicked] = useState(false);
    
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
        let newEntry = {type: type, time: time, details: details, id: id};
        setFoodData(foodData.concat(newEntry)) 
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
                    <ListItem key={element.id} alignItems="flex-start" onDoubleClick={() => setHadDoubledClicked(!hasDoubleClicked)}>
                        <ListItemAvatar>
                        <Avatar>
                            {hasDoubleClicked? <DeleteForeverIcon color="error" onClick={() => console.log(`Delete ${element.id}`)}/> : <KitchenIcon />}
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
                    </ListItem>
                )}
                
                {(Boolean(currentDatesData.training?.id) || Boolean(currentDatesData.notes?.id)) && <Divider />}
                
                {Boolean(currentDatesData.training?.id) && 
                    <ListItem key={currentDatesData.training.id} alignItems="flex-start">
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
                    </ListItem>}

                {Boolean(currentDatesData.notes?.id) && 
                    <ListItem key={currentDatesData.notes.id} alignItems="flex-start">
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
                    </ListItem>}

                <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setFormDialogOpen(true)}>
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
            />
        </Card>
    );
};

function FormDialog({open, setOpen, saveFormData, selectedDate, setSelectedDate, currentDatesData, setCurrentDatesData, userId}) {

    const [formData, setFormData] = useState({type: '', time: selectedDate, details: ''});
    const classes = useStyles();

    function handleSave() {
        setOpen(false);
        //Save new data to server with POST request
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({"id":userId, "type": formData.type, "time": Math.round(formData.time.getTime()/1000), "details": formData.type});
        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/api/user", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((jsonData) => saveFormData({...formData, id: jsonData.id}))
            .catch(error => console.log('error', error));
        setFormData({type: '', time: selectedDate, details: ''})
    }

    function onDialogOpen() {
        let guessType = 'Notes'
        switch((new Date).getHours()) {
            case 8:
            case 9:
            case 10:
                guessType = "Breakfast";
                break;
            case 11:
            case 12:
            case 13:
            case 14:
                guessType = "Lunch";
                break;
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
                guessType = "Dinner";
                break;
            default:
                break;
          }
        setFormData({type: guessType, time: selectedDate, details: ''})
    }

    const handleTimeChange = (newDate) => {
        setSelectedDate(newDate);
        setFormData({...formData, time: newDate})
    }

    return (
      <div>
        <Dialog 
          open={open} 
          onClose={() => setOpen(false)} 
          aria-labelledby="form-dialog-title" 
          onEnter={onDialogOpen}
          >
          <DialogTitle id="form-dialog-title">Add to diary</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the item you want to add to your food diary:
            </DialogContentText>
                <Select
                id="demo-simple-select-outlined"
                className={classes.inputDialog}
                value={formData.type}
                onChange={(event) => setFormData({ ...formData, type: event.target.value })}
                variant="outlined"
                >
                    <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                    <MenuItem value={'Lunch'}>Lunch</MenuItem>
                    <MenuItem value={'Dinner'}>Dinner</MenuItem>
                    <MenuItem value={'Snack'}>Snack</MenuItem>
                    <MenuItem value={'Training'}>Training</MenuItem>
                    <MenuItem value={'Notes'}>Notes</MenuItem>
                </Select><br />
                {formData.type === 'Notes' &&
                <TextField
                id="notes-details"
                className={classes.inputDialog}
                label="Notes Details"
                multiline
                rows={4}
                variant="outlined"
                value={currentDatesData.notes}
                onChange={(event) => {setCurrentDatesData({ ...currentDatesData, notes: event.target.value })
                    setFormData({ ...formData, details: event.target.value })}}
                />
                }
                {formData.type === "Training" &&
                <TextField
                id="training-details"
                className={classes.inputDialog}
                label="Training Details"
                multiline
                rows={4}
                variant="outlined"
                value={currentDatesData.training}
                onChange={(event) => {setCurrentDatesData({ ...currentDatesData, training: event.target.value })
                    setFormData({ ...formData, details: event.target.value })}}
                />
                }
                {(formData.type === "Snack" || formData.type === "Dinner" || formData.type === "Lunch" || formData.type === "Breakfast") &&
                <React.Fragment>
                    <TextField
                    id="details"
                    className={classes.inputDialog}
                    label="Food Details"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.details}
                    onChange={(event) => setFormData({ ...formData, details: event.target.value })}
                    />
                    <br /><br />
                    <TimePicker selectedTime={selectedDate} setSelectedTime={handleTimeChange}/>
                </React.Fragment>}

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }