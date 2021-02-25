import Head                     from 'next/head'
import { TopBar, AuthedTopBar } from './topbar';
import { makeStyles }           from '@material-ui/core/styles';
import Paper                    from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container:{
    width: '97%',
    margin: '1.5% 1.5% -2%',
    minHeight: '90vh',
    backgroundColor: theme.palette.mainBackground
  },
  backColour:{
    backgroundColor: theme.palette.mainBackground
  }
})
)

export default function Main(props) {
  const classes = useStyles();

  return (
    <div className={classes.backColour}> 
      <Head><title>Millers</title></Head>
        {props.isAuthed === true? <AuthedTopBar logout={props.handleLogout} setUserAreaToDisplay={props.setUserAreaToDisplay}/> : <TopBar scrollToRef={props.scrollToRef}/>}
        <Paper className={classes.container} elevation={0}>
          {props.children}
        </Paper>
    </div>
  );
}