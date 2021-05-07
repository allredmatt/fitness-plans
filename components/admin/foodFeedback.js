import { useState, useEffect, useLayoutEffect }  from 'react';
import { makeStyles, withStyles }                from '@material-ui/core/styles';
import * as serverFetch                          from '../../components/serverFetch'
import Typography                                from '@material-ui/core/Typography';
import TextField                                 from '@material-ui/core/TextField' 
import Button                                    from '@material-ui/core/Button';
import Paper                                     from '@material-ui/core/Paper';
import Grid                                      from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({

    paperPad:{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    iframePaper: {
        padding: theme.spacing(1),
    },
    iframe:{
        width: '100%',
        border: 0,
        minHeight: '50vh'
    },
    textInput:{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: "50%"
    }
}));

export default function FoodFeedbackInput ({user}) {

    const [linkForiframe, setLinkForiframe] = useState()
    const [link, setLink] = useState()
    const [urlValidationHasError, setUrlValidationHasError] = useState(false)

    const saveLink = () => {
        serverFetch.modifyFoodFeedbackLink(user.name, link)
    }

    useEffect(() => {
        serverFetch.getFoodFeedback(user.name)
            .then((data) => {
                setLink(data?.foodFeedback)
                setLinkForiframe(validateURL(data?.foodFeedback))
            })
    }, [])

    const validateURL = (link) => {
        if(link === "" ){
            return null
        } else {
            try { 
                let url = new URL (link) 
                setUrlValidationHasError(false)
                if(url.hostname === "docs.google.com") {
                    return `${link}?embedded=true`
                }
                return link
            } catch { 
                setUrlValidationHasError(true)
                return null 
            }
        }
    }

    const classes = useStyles()

    return(
        <Grid item xs={12}>
        <Paper className={classes.paperPad}>
            <Typography >Please enter google docs link: </Typography>
            <TextField
                id="feedback-link"
                label="Feedback Link"
                className={classes.textInput}
                variant="outlined"
                error={urlValidationHasError}
                size="small"
                InputLabelProps={{ shrink: Boolean(link) }}
                value={link}
                onBlur={(event) => setLinkForiframe(validateURL(event.currentTarget.value))}
                onChange={(event) => setLink(event.currentTarget.value)}
            />
            <Button color="secondary" variant="outlined" onClick={saveLink}>Save</Button>
        </Paper>
        <Paper className={classes.iframePaper}>
            <Typography color="textSecondary" variant="h6" >What the user will see:</Typography>
            <iframe className={classes.iframe} src={linkForiframe} />
        </Paper>
        </Grid>
    )
}