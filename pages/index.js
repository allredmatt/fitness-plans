import Head       from 'next/head'
import TopBar                   from './components/topbar.js';
import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import CardMedia                from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  container:{
    width: '98%',
    margin: '3vh 3vw',
  },
  bannerImage:{
    height: 300,
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div > 
      <Head>Millers</Head>
        <TopBar userId={false}/>
        <Card className={classes.container}>
        <CardContent>
        <CardMedia
            className={classes.bannerImage}
            image="https://sites.psu.edu/rgaringernutr360/files/2017/03/fitnessnutrition-142nigo.jpg"
            title="Weights and fruit"
            />
            <Typography gutterBottom variant="h3" component="h1" color='secondary'>
                Millers Fitness and Nutrition
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
                Some rubbish about what you do and how great you are.
                <br /><br />
                <i>"Excellent personalised service, really helped me feel less hungry. Came up with some excellent ideas of how to exercise with kids."</i>
            </Typography>
        </CardContent>
        </Card>
    </div>
  );
}