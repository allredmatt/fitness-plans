import TopBar                   from './components/topbar.js';
import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import CardMedia                from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  container:{
    minWidth: 400,
    maxWidth: '92vw',
    margin: '3vh 3vw',
  },
  flexDiv: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    },
  headCard: {
    width: '95vw',
  },
  bannerImage: {
    height: 150,
  },
  profileImage: {
    height: 200,
    width: 150,
  },
  detailsCard1: {
    order: 1,
    width: 350,
    margin: '2vh 1vw 3px 0px',
  },
  detailsCard2: {
    order: 2,
    width: 350,
    margin: '2vh 1vw 3px 0px',
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div > 
        <TopBar userId={true}/>
        <div className={classes.container}>
        <Card className={classes.headCard}>
        <CardContent>
        <CardMedia
            className={classes.bannerImage}
            image="https://mmo.aiircdn.com/301/5eec9e418fd47.jpg"
            title="Jedward picutre"
            />
            <Typography gutterBottom variant="h5" component="h2">
                About our company...
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Jedward are fitness!
            </Typography>
        </CardContent>
        </Card>
        <div className={classes.flexDiv}>
        <Card className={classes.detailsCard1}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://pbs.twimg.com/profile_images/378800000567385280/4c5097d465d0e197288d9988e237848f.jpeg"
            title="Jedward picutre"
            />
            <Typography gutterBottom variant="h6" component="h3">
                John Grimes
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Identical twin brothers John Paul Henry Daniel Richard Grimes and Edward Peter Anthony Kevin Patrick Grimes were born in Dublin. 
            John and Edward's first school was Scoil Bhríde National School in Rathangan. They then attended King's Hospital School for four years before being moved 
            to the Dublin Institute of Education. 
            </Typography>
        </CardContent>
        </Card>

        <Card className={classes.detailsCard2}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://www.famousbirthdays.com/headshots/edward-grimes-singer-5.jpg"
            title="Jedward picutre"
            />
            <Typography gutterBottom variant="h6" component="h3">
                Edward Grimes
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            The twins competed in school talent shows during their school years and were inspired by Justin Timberlake, Britney Spears and the Backstreet Boys. 
            They were also members of the Lucan Harriers Athletic Club and Dundrum South Dublin athletics club and have competed in several Irish athletic tournaments.
            </Typography>
        </CardContent>
        </Card>
        </div>
        </div>
    </div>
  );
}