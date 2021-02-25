import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import Paper                    from '@material-ui/core/Paper';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import CardMedia                from '@material-ui/core/CardMedia';
import Divider                  from '@material-ui/core/Divider';
import MailOutlineIcon          from '@material-ui/icons/MailOutline';
import IconButton               from '@material-ui/core/IconButton';

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
    height: 420,
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
  serviceCard1: {
    order: 1,
    width: 350,
    margin: '2vh 1vw 3px 0px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  serviceCard2: {
    order: 2,
    width: 350,
    margin: '2vh 1vw 3px 0px',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
  },
  serviceCard3: {
    order: 3,
    width: 350,
    margin: '2vh 1vw 3px 0px',
    background: 'linear-gradient(45deg, #ebb00e 30%, #ebe134 90%)'
  },
  margin: {
    margin: theme.spacing(1),
  },
  media:{
    height: 150
  }
}));

const useStyles = makeStyles((theme) => ({
    container:{
      width: '100%',
      backgroundColor: '#6d7896',
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    card:{
      marginBottom: theme.spacing(1),
    },
    bannerImage:{
      width: "100%",
      height: "640px",
    }
  }));

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container} elevation={0}> 
        <img
            className={classes.bannerImage}
            src="/weightspepper.jpg"
            title="Weights and fruit"
            />
    </Paper>
  );
}

const About = React.forwardRef((props, ref) => {
  const classes = useAboutStyles();

  return (
    <div ref={ref} >
      <Paper className={classes.headCard}>
        <Typography gutterBottom variant="h5" component="h2" color="secondary">
            About us
      </Typography>
        <Typography gutterBottom variant="h6" color="textPrimary" component="p">
                Some rubbish about what you do and how great you are.
                <br />
                <i>"Excellent personalised service, really helped me feel less hungry. Came up with some excellent ideas of how to exercise with kids."</i>
        </Typography>
        <Divider variant="middle"/>
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
                Prices will vary depending on your requirements from us, don't hesitate to be in contact fro further info.
            </Typography>
            <div className={classes.flexDiv}>
            <Card className={classes.serviceCard1}>
              <CardMedia
                className={classes.media}
                image="/veg.jpg"
                title="Vegetables"
              />
              <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h3">
                    Dietary analysis
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    We will use our experience in this field, as well as government guidelines to give you personalised feedback on your diet, and recommend changes to address any issues or problems 
                    you may be having.
                  </Typography>
              </CardContent>
            </Card>
            <Card className={classes.serviceCard2}>
              <CardMedia
                className={classes.media}
                image="/running.jpg"
                title="Vegetables"
              />
              <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h3">
                    Bespoke fitness plans
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    We will consult with you to develop a fitness plan to suit you, no matter what your goals. If you want to maintain a level of fitness, are looking to make the best use of your time at the gym, or are 
                    after innovative ways to work out then we will tailor a sessions to do this.
                  </Typography>
              </CardContent>
            </Card>
            <Card className={classes.serviceCard3}>
              <CardMedia
                className={classes.media}
                image="/tape.jpg"
                title="Vegetables"
              />
              <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h3">
                    Combined Service
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    We will look at providing the dietary analysis and bespoke fitness plans but will manage both of these together to ensure any dietary changes work in tandem with your fitness plans to fully support your development. 
                  </Typography>
              </CardContent>
            </Card>
            </div>
        </Paper>
    </div>
  );
})

const Contacts = React.forwardRef((props, ref) => {
  const classes = useAboutStyles();

  return (
    <div ref={ref}>
      <Paper className={classes.headCard}>
            <Typography gutterBottom variant="h6" component="h1" color='secondary'>
                Contact Us
      </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
                Please contact us in any of the following way:
            </Typography>
            <IconButton aria-label="Email" className={classes.margin} href="mailto:millersfitnessandnutrition@gmail.com">
              <MailOutlineIcon fontSize="large" />
            </IconButton>
      </Paper>
    </div>
  );
})

export {HomeHeader, About, Services, Contacts}