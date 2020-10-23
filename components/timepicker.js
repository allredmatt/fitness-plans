import { MuiPickersUtilsProvider, KeyboardTimePicker }  from "@material-ui/pickers";
import DateFnsUtils                                     from '@date-io/date-fns';

export default function TimePicker({selectedTime, setSelectedTime}) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} minWidth={'250px'} marginBottom={'5px'}>
      <KeyboardTimePicker
        autoOk={true}
        ampm={false}
        label="Time"
        inputVariant="outlined"
        value={selectedTime}
        onChange={(time) => {setSelectedTime(time)}}
      />
    </MuiPickersUtilsProvider>
  );
}

