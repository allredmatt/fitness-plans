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

export default function FoodListItem ({currentId, handleListClick, foodElementClickedId, type, primaryText, secondaryText, setFormDialogOpen, deleteServerEntry}) {

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
        <ListItem key={currentId} alignItems="flex-start" button onClick={() => handleListClick(currentId)} >
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
                            <EditIcon color="primary"/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteServerEntry(currentId)}>
                            <DeleteForeverIcon color="primary"/>
                        </IconButton>
                    </ListItemSecondaryAction> 
                    : null}
        </ListItem>
    )
}