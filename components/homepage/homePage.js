import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import Paper                    from '@material-ui/core/Paper';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import CardMedia                from '@material-ui/core/CardMedia';
import MailOutlineIcon          from '@material-ui/icons/MailOutline';
import IconButton               from '@material-ui/core/IconButton';
import { Button, CardActions,
   List, ListItem, ListItemIcon, 
   ListItemText, Hidden }               from '@material-ui/core';
import CheckCircleOutlineIcon   from '@material-ui/icons/CheckCircleOutline';
import Avatar                   from '@material-ui/core/Avatar';
import ProfileCard from './profileCard';
import Endorsement, { EndorsementSmall, Footer } from './footer';
import Image                                    from 'next/image'
import { min } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    display: 'flex',
    flexWrap: 'nowrap',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    },
    overflowX: 'auto',
    width: 'calc(100% + 20px)',
    },
  profileImage: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    marginRight: theme.spacing(1.5)
  },
  serviceCard1: {
    flex: '0 0 auto',
    width: 325,
    overflowY: 'auto',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginRight: theme.spacing(1.5)
  },
  serviceCard2: {
    flex: '0 0 auto',
    width: 325,
    overflowY: 'auto',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    marginRight: theme.spacing(1.5)
  },
  serviceCard3: {
    flex: '0 0 auto',
    width: 325,
    overflowY: 'auto',
    background: 'linear-gradient(45deg, #e8932c 40%, #ebb00e 70%)',
    marginRight: theme.spacing(1.5)
  },
  margin: {
    margin: theme.spacing(1),
  },
  media: {
    height: 100,
    marginBottom: theme.spacing(1),
  },
  slide: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(1),

    /* align center */
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: 'relative',

    /* scroll-snap */
    scrollSnapAlign: "start",
    scrollSnapStop: "normal",

    backgroundColor: theme.palette.primary.light
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(2),

    /* align center */
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  bannerImage:{
    position: 'absolute',
    //top: '50%',
    height: '100%',
    maxWidth: '100vw',
  },
  scrollXMobile: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 'auto',
  },
  textSecondary:{
    color: theme.palette.text.secondary
  },
  verticalPad:{
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  wrapper:{
    position: 'absolute',
    top: '35%',
    transform: 'translate(0%, -30%)',
    paddingLeft: '70px',
    paddingRight: '100px',
    maxWidth: '100vw',
    background: 'radial-gradient(ellipse, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)',
  },
  imageWrapper:{
    //transform: 'translate(0, -50%)'
  },
  profileContainer:{
    display: 'grid',
    gridTemplateColumns: '50px 50px 50px 50px',
    gridTemplateRows: 'auto',
    gridTemplateAreas: 
      `"header header header header"
       "main main . sidebar"
       "footer footer footer footer"`,
  },
  infoContainer:{
    /* If on larger screen make space for endorsement footer */
    [theme.breakpoints.up('md')]: {
      transform: 'translate(0, -16%)' 
    },
    [theme.breakpoints.only('sm')]: {
      transform: 'translate(0, -10%)' 
    },
    [theme.breakpoints.only('xl')]: {
      transform: 'translate(0, -20%)' 
    },
    /* align center */
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: '100%'
  }
}));

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.slide}>
    <div className={classes.bannerImage}>
      <Image
        className={classes.imageWrapper}
        src="/turfgames.jpg"
        alt="Human Pyramid with Ed and Jess Miller"
        width={1080}
        height={1200}
        layout="intrinsic"
      /> 
    </div>
    
    <Paper className={classes.container} elevation={0}>
    
    <div className={classes.wrapper}>
      
      <div className={classes.verticalPad}>
        <Typography variant='h2' color="secondary">Millers Fitness and Nutrition</Typography>
      </div>
    </div>
      
    </Paper>
    </div>
  );
}

const About = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <div ref={ref} className={classes.slide}>
      <Paper className={classes.container}>
        <div className={classes.infoContainer}>
            <Typography gutterBottom variant="h4" component="h2" color="textPrimary">
                About us
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                Millers fitness are founded on the belief that everyone can attain their potential.
            </Typography>
          <div className={classes.flexDiv}>
            <ProfileCard 
              image = '/bothProfile.webp'
              name = 'Millers'
              title = 'Fitness and Nutrition'
              body = "Miller's Fitness and Nutrition was founded by Jess and Ed, a Husband and Wife team with a passion for creating accessible fitness programmes and nutrition advice. We were tired of seeing generic programmes that made people lose motivation and put them off exercise or eating well forever. "
              backgroundColor = 'linear-gradient(45deg, #e8932c 40%, #ebb00e 70%)'
              linkToPath="/home"
            />

            <ProfileCard 
              image = '/edProfile.webp'
              name = 'Ed Miller'
              title = 'Personal Trainer'
              body = 'I have worked as a personal fitness trainer for 10 years, training and coaching people though various training programs. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..'
              backgroundColor = 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
            />

            <ProfileCard 
              image="/jessProfile.webp"
              name = 'Jess Miller'
              title = 'Physiotherapist'
              body = ' I am a fully trained and practising physio therapist. I have been working to More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..'
              backgroundColor = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            />
        </div>
        </div>
        <Hidden mdDown>
          <Endorsement name='Tracey' quote='I now have fun exercises I can do with the children' />
        </Hidden>
        <Hidden only={['xs', 'md', 'lg', 'xl']}>
             <EndorsementSmall name='Tracey' quote='I now have fun exercises I can do with the children' />
          </Hidden>
        </Paper>
    </div>
  );
})

const Services = React.forwardRef((props, ref) => {

  const classes = useStyles();

  return (
    <div ref={ref} className={classes.slide}> 
        <Paper className={classes.container}>
        <div className={classes.infoContainer}>
            <Typography gutterBottom variant="h4" component="h1" color="textPrimary">
                Our Services
            </Typography>
            <Hidden xsDown>
            <Typography gutterBottom variant="body1" color="textPrimary" component="p">
              Depending on what you wish to achieve we offer a range of bespoke services.
            </Typography></Hidden>
         
            <div className={classes.flexDiv}>

            <Card className={classes.serviceCard1}>
              <CardMedia
                className={classes.media}
                image="/veg.jpg"
                title="Vegetables"
              />
              <CardContent>
              <Typography variant="h5" color="textSecondary" component="h3">
                <b>Diet Analysis</b>
              </Typography>
              <List className={classes.textSecondary} disablePadding >

                <ListItem >
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Assess your diet against recommended guidelines'}/>
                </ListItem>

                <ListItem >
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary='Check your intake of nutrients' />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary='Work out how to improve any periods of hunger'/>
                </ListItem>

              </List>
              </CardContent>
            </Card>

            <Card className={classes.serviceCard2}>
              <CardMedia
                className={classes.media}
                image="/running.jpg"
                title="Running"
              />
              <CardContent>
                  <Typography color='textSecondary' variant="h5">
                    <b>Fitness plans</b>
                  </Typography>
                  <List className={classes.textSecondary} disablePadding>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Consult with you to ascertain your goals'}/>
                </ListItem>

                <ListItem >
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary='Develop a schedule for you to follow' />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary='Use of fitness plan and tracking web app'/>
                </ListItem>
              </List>
              </CardContent>
            </Card>
            <Card className={classes.serviceCard3}>
              <CardMedia
                className={classes.media}
                image="/tape.jpg"
                title="Vegetables"
              />
              <CardContent>
                  <Typography variant="h5" component="h3" color='textSecondary'>
                    <b>Combined Service</b>
                  </Typography>
                  <List className={classes.textSecondary} disablePadding>

                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='All the items included in the other packages'/>
                  </ListItem>

                  <ListItem >
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='Match your diet against your fitness plan' />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='Ensure these work in tandem to support you'/>
                  </ListItem>

                  </List>
                  </CardContent>
            </Card>
            </div>
            </div>
            <Hidden smDown>
             <Endorsement name='Tracey' quote='Really helped me feel less hungry throughout the day' />
            </Hidden>
            <Hidden only={['xs', 'md', 'lg', 'xl']}>
             <EndorsementSmall name='Tracey' quote='Really helped me feel less hungry throughout the day' />
            </Hidden>
        </Paper>
    </div>
  );
})

const Contacts = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <div ref={ref} className={classes.slide}>
      <Paper className={classes.container}>
            <Typography gutterBottom variant="h4" component="h1" color="textPrimary">
                Contact Us
      </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
                Please contact us in any of the following way:
            </Typography>
            <IconButton aria-label="Email" className={classes.margin} href="mailto:millersfitnessandnutrition@gmail.com">
              <MailOutlineIcon fontSize="large" />
            </IconButton>
      </Paper>
      <Footer />
    </div>
  );
})

export {HomeHeader, About, Services, Contacts}