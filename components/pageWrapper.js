import Head                     from 'next/head'
import TopBar                   from './topbar.js';
import {useUser, userContext}   from '../context/checkUser.js';
import { makeStyles }           from '@material-ui/core/styles';
import Paper                    from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container:{
    width: '98%',
    margin: '1.5% 1.5%',
    height: '100%',
    backgroundColor: '#6d7896'
  },
});

export default function Main(props) {
  const classes = useStyles();

  const user = useUser();

  return (
    <div > 
      <Head><title>Millers</title></Head>
      <userContext.Provider value={user}>
        <TopBar scrollToRef={props.scrollToRef}/>
        <Paper className={classes.container} elevation={0}>
          {props.children}
        </Paper>
      </userContext.Provider>
    </div>
  );
}