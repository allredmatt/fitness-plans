import { useState, useEffect }              from 'react';
import { makeStyles }                       from '@material-ui/core/styles';
import Paper                                from '@material-ui/core/Paper';
import * as serverFetch                     from './serverFetch'

const useStyles = makeStyles((theme) => ({
    iframePaper: {
      padding: theme.spacing(0.5),
      textAlign: 'center',
    },
    iframe:{
      width: '100%',
      border: 0,
      minHeight: '50vh'
    }
  }));

export default function Feedback ( {user} ) {

    const [link, setLink] = useState('')

    const classes = useStyles()

    useEffect(() => {
        serverFetch.getFoodFeedback(user.name)
            .then(data => setLink(`${data.foodFeedback}?embedded=true`))
    }, [user.name])

    return (
        <Paper className={classes.iframePaper}>
            <iframe className={classes.iframe} src={link} />
        </Paper>
    )
}


