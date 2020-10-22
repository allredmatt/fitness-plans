import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import Paper                    from '@material-ui/core/Paper';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import CardMedia                from '@material-ui/core/CardMedia';

const useAboutStyles = makeStyles((theme) => ({
  flexDiv: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'left',
    },
  headCard: {
    padding: '1.5%',
    marginBottom: theme.spacing(1),
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
}));

const useStyles = makeStyles((theme) => ({
    container:{
      width: '100%',
    },
    card:{
      marginBottom: theme.spacing(1),
    },
    bannerImage:{
      height: 400,
    }
  }));

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}> 
        <Card className={classes.card}>
        <CardContent>
        <CardMedia
            className={classes.bannerImage}
            image="/weightspepper.jpg"
            title="Weights and fruit"
            />
            <Typography gutterBottom variant="h4" component="h1" color='primary'>
                Millers Fitness and Nutrition
            </Typography>
            <Typography variant="h6" color="textPrimary" component="p">
                Some rubbish about what you do and how great you are.
                <br /><br />
                <i>"Excellent personalised service, really helped me feel less hungry. Came up with some excellent ideas of how to exercise with kids."</i>
            </Typography>
        </CardContent>
        </Card>
    </div>
  );
}

const About = React.forwardRef((props, ref) => {
  const classes = useAboutStyles();

  return (
    <div ref={ref} > 
      <Paper className={classes.headCard}>
        <Typography gutterBottom variant="h5" component="h2" color="primary">
            About our company...
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
            Millers fitness are founded on the belief that everyone can attain their potential. We are a husband and wife team who will help you on your journey:
        </Typography>
      <div className={classes.flexDiv}>
        <Card className={classes.detailsCard1}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://pbs.twimg.com/profile_images/378800000567385280/4c5097d465d0e197288d9988e237848f.jpeg"
            title="Ed Miller"
            />
            <Typography gutterBottom variant="h6" component="h3">
              Ed Miller
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              I have worked as a personal fitness trainer for 10 years, training and coaching people though various training programs. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..
            </Typography>
        </CardContent>
        </Card>

        <Card className={classes.detailsCard2}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://www.famousbirthdays.com/headshots/edward-grimes-singer-5.jpg"
            title="Jess Miller"
            />
            <Typography gutterBottom variant="h6" component="h3">
                Jess Miller
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              I am a fully trained and practising physio therapist. I have been working to More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..
            </Typography>
        </CardContent>
        </Card>
        </div>
        </Paper>
    </div>
  );
})

const Services = React.forwardRef((props, ref) => {
  const classes = useAboutStyles();

  return (
    <div ref={ref}> 
        <Paper className={classes.headCard}>
            <Typography gutterBottom variant="h6" component="h1" color='primary'>
                Our Services
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
                Depending on what you wish to achieve we offer a range of bespoke services.
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                Choose from having your food intake analysed and recommendations give to help you feel full throughout the day, and ensure you are gaining all the correct nutrients each week.
                We also offer a fully formed daily fitness plan, whether you are training for a specific event or just wanting to maximise your gym time we will write a program to fit your needs.
            </Typography>
        </Paper>
    </div>
  );
})

const Contacts = React.forwardRef((props, ref) => {
  const classes = useAboutStyles();

  return (
    <div ref={ref}> 
        <Paper className={classes.headCard}>
            <Typography gutterBottom variant="h6" component="h1" color='primary'>
                Contact Us
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
                Please use the following form to get in touch or email us directly.
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                CONTACT FORM PLACE HOLDER
            </Typography>
        </Paper>
    </div>
  );
})

export {HomeHeader, About, Services, Contacts}