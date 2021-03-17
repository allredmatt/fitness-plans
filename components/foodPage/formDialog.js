import TimePicker               from './timepicker.js';
import { useState }             from 'react';
import Button                   from '@material-ui/core/Button';
import TextField                from '@material-ui/core/TextField';
import Dialog                   from '@material-ui/core/Dialog';
import DialogActions            from '@material-ui/core/DialogActions';
import DialogContent            from '@material-ui/core/DialogContent';
import DialogContentText        from '@material-ui/core/DialogContentText';
import DialogTitle              from '@material-ui/core/DialogTitle';
import Select                   from '@material-ui/core/Select';
import MenuItem                 from '@material-ui/core/MenuItem';
import * as serverFetch         from '../serverFetch'

export default function FormDialog ({ 
    open, setOpen, updateParentState, selectedDate, setSelectedDate, currentDatesData, editElementId, setEditElementId, classes 
}) {

    const [formData, setFormData] = useState({ type: '', time: '', details: '' });

    function handleSave() {
        setOpen(false);
        updateParentState(formData)
        setFormData({ type: '', time: '', details: '' });
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
            setFormData(
                currentDatesData.find((element) => element.id === editElementId)
            );
        }
    }

    const handleTimeChange = (newDate) => {
        setSelectedDate(newDate);
        setFormData({ ...formData, time: newDate });
    };

    const handleTypeChange = (newType) => {
        setFormData({ ...formData, type: newType });
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
                    <DialogContentText className={classes.dialog}>
                        {editElementId ? "Please edit the details for this diary entry" : "Please enter the details to add to your food diary"}
                    </DialogContentText>
                    <Select
                        id="select-form-type"
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
                    </Select>
                    <div className={classes.timePicker}>
                        <TimePicker  selectedTime={formData.time} setSelectedTime={handleTimeChange} />
                    </div>
                    <TextField
                        id="details"
                        className={classes.inputDialog}
                        label="Details"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formData.details}
                        onChange={(event) => setFormData({ ...formData, details: event.target.value })} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => {
                            setOpen(false);
                            setEditElementId(false);
                        }} 
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
