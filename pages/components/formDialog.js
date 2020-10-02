import TimePicker from './timepicker.js';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './foodCalendar';

export default function FormDialog ({ open, setOpen, saveFormData, selectedDate, setSelectedDate, currentDatesData, setCurrentDatesData, userId, editElementId, setEditElementId }) {

    const [formData, setFormData] = useState({ type: '', time: '', details: '' });
    const classes = useStyles();

    function handleSave() {
        setOpen(false);
        //Save new data to server with POST request
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (formData.id) {
            //Updates existing in via a PUT
            const raw = JSON.stringify({ "ElementId": editElementId, "type": formData.type, "time": Math.round(formData.time.getTime() / 1000), "details": formData.details });
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/user", requestOptions)
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .then((jsonData) => saveFormData({ ...formData, id: jsonData.id }))
                .catch(error => console.log('error', error));
        } else {
            //Adds a new entry to database via a POST
            const raw = JSON.stringify({ "id": userId, "type": formData.type, "time": Math.round(formData.time.getTime() / 1000), "details": formData.details });
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/user", requestOptions)
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .then((jsonData) => saveFormData({ ...formData, id: jsonData.id }))
                .catch(error => console.log('error', error));
        }
        setFormData({ type: '', time: '', details: '', id: null });
    }

    function onDialogOpen() {
        if (editElementId === false) {
            let guessType = 'Notes';
            let workingDate = new Date(selectedDate);
            workingDate.setHours((new Date()).getHours());
            switch (workingDate.getHours()) {
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
            setSelectedDate(workingDate);
            setFormData({ type: guessType, time: workingDate, details: '' });
        } else {
            let index = currentDatesData.food.findIndex((element) => element.id === editElementId);
            if (index === -1) {
                if (currentDatesData.training.id === editElementId) {
                    setFormData({ type: "Training", time: selectedDate, details: currentDatesData.training.details, id: currentDatesData.training.id });
                } else {
                    setFormData({ type: "Notes", time: selectedDate, details: currentDatesData.notes.details, id: currentDatesData.notes.id });
                }
            } else {
                setFormData({ type: currentDatesData.food[index].type, time: currentDatesData.food[index].time, details: currentDatesData.food[index].details, id: currentDatesData.food[index].id });
            }
        }
    }

    const handleTimeChange = (newDate) => {
        setSelectedDate(newDate);
        setFormData({ ...formData, time: newDate });
    };

    const handleTypeChange = (newType) => {
        if (newType === "Notes") {
            if (currentDatesData.notes.id) {
                setFormData({ ...formData, type: "Notes", details: currentDatesData.notes.details, id: currentDatesData.notes.id });
                setEditElementId(currentDatesData.notes.id);
            } else {
                setFormData({ ...formData, type: "Notes", details: "" });
            }
        } else if (newType === "Training") {
            if (currentDatesData.training.id) {
                setFormData({ ...formData, type: "Training", details: currentDatesData.training.details, id: currentDatesData.training.id });
                setEditElementId(currentDatesData.training.id);
            } else {
                setFormData({ ...formData, type: "Notes", details: "" });
            }
        } else {
            setFormData({ ...formData, type: newType });
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
                onEnter={onDialogOpen}
            >
                <DialogTitle id="form-dialog-title">{editElementId ? "Edit diary entry" : "Add to diary"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editElementId ? "Please edit the details for this diary entry" : "Please enter the item you want to add to your food diary"}
                    </DialogContentText>
                    <Select
                        id="demo-simple-select-outlined"
                        className={classes.inputDialog}
                        value={formData.type}
                        onChange={(event) => handleTypeChange(event.target.value)}
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
                            value={formData.details}
                            onChange={(event) => setFormData({ ...formData, details: event.target.value })} />}
                    {formData.type === "Training" &&
                        <TextField
                            id="training-details"
                            className={classes.inputDialog}
                            label="Training Details"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={formData.details}
                            onChange={(event) => setFormData({ ...formData, details: event.target.value })} />}
                    {(formData.type === "Snack" || formData.type === "Dinner" || formData.type === "Lunch" || formData.type === "Breakfast") &&
                        <React.Fragment>
                            <TextField
                                id="details"
                                className={classes.inputDialog}
                                label="Food Details"
                                multiline
                                rows={5}
                                variant="outlined"
                                value={formData.details}
                                onChange={(event) => setFormData({ ...formData, details: event.target.value })} />
                            <br /><br />
                            <TimePicker selectedTime={formData.time} setSelectedTime={handleTimeChange} />
                        </React.Fragment>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpen(false);
                        setEditElementId(false);
                    }} color="primary">
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
