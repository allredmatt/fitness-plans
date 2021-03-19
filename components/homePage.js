import { makeStyles }           from '@material-ui/core/styles';
import Card                     from '@material-ui/core/Card';
import Paper                    from '@material-ui/core/Paper';
import CardContent              from '@material-ui/core/CardContent';
import Typography               from '@material-ui/core/Typography';
import CardMedia                from '@material-ui/core/CardMedia';
import MailOutlineIcon          from '@material-ui/icons/MailOutline';
import IconButton               from '@material-ui/core/IconButton';
import { Button, CardActions, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  flexDiv: {
    display: 'flex',
    flexWrap: 'nowrap',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    },
    overflowX: 'auto',
    width: 'calc(100% + 20px)',
    columnGap: theme.spacing(1.5)
    },
  profileImage: {
    height: 200,
    width: 150,
  },
  serviceCard1: {
    flex: '0 0 auto',
    width: 325,
    overflowY: 'auto',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  serviceCard2: {
    flex: '0 0 auto',
    width: 325,
    overflowY: 'auto',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
  },
  serviceCard3: {
    flex: '0 0 auto',
    width: 325,
    overflowY: 'auto',
    background: 'linear-gradient(45deg, #e8932c 40%, #ebb00e 70%)'
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
    overflowX: 'hidden',
    padding: theme.spacing(2),
    height: '100%'
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
    top: '30%',
    paddingLeft: '100px',
    paddingRight: '100px',
    background: 'radial-gradient(ellipse, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)',
  },
}));

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.slide}>
    <Paper className={classes.container} elevation={0}> 
    <img src='/turfgames.jpg' className={classes.bannerImage}/>
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
        <Typography gutterBottom variant="h4" component="h2" color="textPrimary">
            About us
        </Typography>
        <Typography gutterBottom variant="body1" color="textPrimary" component="p">
            Millers fitness are founded on the belief that everyone can attain their potential.
        </Typography>
      <div className={classes.flexDiv}>
        <Card className={classes.serviceCard3}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jedward-2017-1550236010.jpg"
            title="Millers Fitness"
            />
            <Typography gutterBottom color='textSecondary' variant="h6" component="h3">
              Our Company
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Formed in 2019 to help a friend train in rubbish, blah blah blah. Something about how we've helped people.
            </Typography>
        </CardContent>
        </Card>

        <Card className={classes.serviceCard2}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://pbs.twimg.com/profile_images/378800000567385280/4c5097d465d0e197288d9988e237848f.jpeg"
            title="Ed Miller"
            />
            <Typography gutterBottom color='textSecondary' variant="h6" component="h3">
              Ed Miller
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              I have worked as a personal fitness trainer for 10 years, training and coaching people though various training programs. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..
            </Typography>
        </CardContent>
        </Card>

        <Card className={classes.serviceCard1}>
        <CardContent>
            <CardMedia
            className={classes.profileImage}
            image="https://www.famousbirthdays.com/headshots/edward-grimes-singer-5.jpg"
            title="Jess Miller"
            />
            <Typography gutterBottom color='textSecondary' variant="h6" component="h3">
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

  const {isOnScreen} = props

  const classes = useStyles();

  return (
    <div ref={ref} className={classes.slide}> 
        <Paper className={classes.container}>
          
            <Typography gutterBottom variant="h4" component="h1" color="textPrimary">
                Our Services
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary" component="p">
              Depending on what you wish to achieve we offer a range of bespoke services.
            </Typography>
         
            <div className={classes.flexDiv}>

            <Card className={classes.serviceCard1}>
              <CardMedia
                className={classes.media}
                image="/veg.jpg"
                title="Vegetables"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" color="textSecondary" component="h3">
                <b>Diet Analysis</b>
              </Typography>
              <List className={classes.textSecondary}>

                <ListItem>
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
              <CardActions>
                <Button variant='outlined' className={classes.textSecondary}>More Info</Button>
              </CardActions>
            </Card>

            <Card className={classes.serviceCard2}>
              <CardMedia
                className={classes.media}
                image="/running.jpg"
                title="Running"
              />
              <CardContent>
                  <Typography gutterBottom color='textSecondary' variant="h5">
                    <b>Fitness plans</b>
                  </Typography>
                  <List className={classes.textSecondary}>

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
              <CardActions>
                <Button variant='outlined' className={classes.textSecondary}>More Info</Button>
              </CardActions>
            </Card>
            <Card className={classes.serviceCard3}>
              <CardMedia
                className={classes.media}
                image="/tape.jpg"
                title="Vegetables"
              />
              <CardContent>
                  <Typography gutterBottom variant="h5" component="h3" color='textSecondary'>
                    <b>Combined Service</b>
                  </Typography>
                  <List className={classes.textSecondary}>

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
                  <CardActions>
                  <Button variant='outlined' className={classes.textSecondary}>More Info</Button>
                  </CardActions>
            </Card>
            </div>
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
    </div>
  );
})

export {HomeHeader, About, Services, Contacts}