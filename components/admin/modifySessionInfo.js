import TextField                            from '@material-ui/core/TextField';
import FormControlLabel                     from '@material-ui/core/FormControlLabel';
import Switch                               from '@material-ui/core/Switch';
import DeleteIcon                           from '@material-ui/icons/Delete';
import IconButton                           from '@material-ui/core/IconButton';
import { useState }                         from 'react'

export default function ModifySessionInfo ({classes, currentSessionInfo, setCurrentSessionInfo, deleteSession, isActiveSession, setShouldBeActiveSession}) {

    const [switchState, setSwitchState] = useState(false)

    

    return (
        <React.Fragment>
        <TextField
            id="session-title"
            label="Session Title"
            variant="outlined"
            size="small"
            className={classes.textArea}
            value={currentSessionInfo.sessionTitle}
            onChange={(event) => setCurrentSessionInfo({...currentSessionInfo, sessionTitle: event.target.value, hasChanged: true})}
        />
        <TextField
            id="short-title"
            label="Short Title"
            variant="outlined"
            size="small"
            className={classes.textArea}
            value={currentSessionInfo.shortTitle}
            onChange={(event) => setCurrentSessionInfo({...currentSessionInfo, shortTitle: event.target.value, hasChanged: true})}
        />
        <FormControlLabel
            control={
                <Switch
                    checked={isActiveSession}
                    onChange={(event) => setShouldBeActiveSession(event.target.checked)}
                    name="isCurrent"
                    color="primary"
                    
                />}
            label="Is Active Session"
        />
        <IconButton 
            edge="end" 
            aria-label="delete" 
            onClick={(deleteSession)}
        >
            <DeleteIcon color="secondary"/>
        </IconButton>
        </React.Fragment>
    )
}