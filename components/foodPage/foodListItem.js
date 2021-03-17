import ListItem                 from '@material-ui/core/ListItem';
import ListItemText             from '@material-ui/core/ListItemText';
import ListItemAvatar           from '@material-ui/core/ListItemAvatar';
import Avatar                   from '@material-ui/core/Avatar';
import DeleteForeverIcon        from '@material-ui/icons/DeleteForever';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import EditIcon                 from '@material-ui/icons/Edit';
import IconButton               from '@material-ui/core/IconButton';
import KitchenIcon              from '@material-ui/icons/Kitchen';
import FitnessCenterIcon        from '@material-ui/icons/FitnessCenter';
import NotesIcon                from '@material-ui/icons/Notes';
import { makeStyles }           from '@material-ui/core/styles';




export default function FoodListItem ({currentId, handleListClick, foodElementClickedId, type, primaryText, secondaryText, setFormDialogOpen, deleteServerEntry}) {

    const useStyles = makeStyles((theme) => ({
        buttonColour:{
            backgroundColor: foodElementClickedId === currentId ? theme.palette.background.highlighted : 'transparent'
        }
    }))

    const classes = useStyles()

    let Icon = null;
    switch (type) {
        case 'Notes':
            Icon = <NotesIcon />
            break
        case 'Training':
            Icon = <FitnessCenterIcon />
            break
        default:
            Icon = <KitchenIcon />
    }

    return (
        <ListItem key={currentId} alignItems="flex-start" button onClick={() => handleListClick(currentId)} className={classes.buttonColour}>
            <ListItemAvatar>
            <Avatar>
                {Icon}
            </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={primaryText}
                secondary={secondaryText}
                />
                {foodElementClickedId === currentId ? 
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit" onClick={() => setFormDialogOpen(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteServerEntry(currentId)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </ListItemSecondaryAction> 
                    : null}
        </ListItem>
    )
}