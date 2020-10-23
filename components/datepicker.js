import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { Badge } from "@material-ui/core";

export default function DatePicker ({date, newDate, datesWithInfo}) {

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    autoOk={true}
                    disableToolbar
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Select Date"
                    value={date}
                    onChange={(date) => newDate(date)}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                    renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                        const isSelected = datesWithInfo.includes(day.toLocaleDateString());
                        return <Badge badgeContent={isSelected ? "✅" : undefined}>{dayComponent}</Badge>;
                      }}
                />
            </MuiPickersUtilsProvider>
        </div>
    )

}