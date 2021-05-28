import { makeStyles }                       from '@material-ui/core/styles';
import Paper                                from '@material-ui/core/Paper';
import Typography                           from '@material-ui/core/Typography';
import Hidden                               from '@material-ui/core/Hidden';
import ProfileCard                          from './profileCard';
import Endorsement, { EndorsementSmall }    from './footer';

const useStyles = makeStyles((theme) => ({
    
    slide: {
        width: "100%",
        padding: theme.spacing(1),
        height: `100vh`, //Changed from 100%

        /* align center */
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: 'relative',

        /* scroll-snap */
        scrollSnapAlign: "start",

        backgroundColor: theme.palette.primary.dark
    },
    offset: theme.mixins.toolbar,
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
    },
    flexDiv: {
        display: 'flex',
        flexWrap: 'nowrap',
        [theme.breakpoints.up('lg')]: {
          justifyContent: 'center'
        },
        overflowX: 'auto',
        width: 'calc(100% + 20px)',
        },
}))

const About = React.forwardRef((props, ref) => {
    const classes = useStyles();
  
    return (
      <section ref={ref} className={classes.slide}>
        <div className={classes.offset} />
        <Paper className={classes.container}>
          <div className={classes.infoContainer}>
              <Typography gutterBottom variant="h4" component="h2" color="textPrimary">
                  About us
              </Typography>
              <Hidden smDown>
                <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                    Millers fitness are founded on the belief that everyone can attain their potential.
                </Typography>
              </Hidden>
            <div className={classes.flexDiv}>
              <ProfileCard 
                image = '/bothProfile.webp'
                name = 'Millers'
                title = 'Fitness and Nutrition'
                list1 = 'Passion for creating accessible programmes'
                list2 = 'Tired of seeing generic programmes'
                list3 = 'Want people to exercise and eating well forever'
                extraBody = "Miller's Fitness and Nutrition was founded by Jess and Ed, a Husband and Wife team with a passion for creating accessible fitness programmes and nutrition advice. We were tired of seeing generic programmes that made people lose motivation and put them off exercise or eating well forever. We work with each individual client, helping you to achieve your own personal exercise goals, whatever they may be and whatever equipment you have (even if that's nothing!), and offer simple, tried and tested nutrition advice that won't feel like dieting and will help you to create lifelong changes and results. Alongside over 15 years of combined experience working with fitness clients, we have both enjoyed participating in various types of exercise over the years including team sports, weightlifting, strongman (and woman), CrossFit, and bodybuilding. We have both enjoyed great results following the same nutrition advice we give to clients including energy levels, appearance and performance, and we are keen to help you achieve your goals whatever they may be."
                backgroundColor = 'linear-gradient(45deg, #cf7c19  30%, #f29f3a 90%)'
              />
  
              <ProfileCard 
                image = '/edProfile.webp'
                name = 'Ed Miller'
                title = 'Fitness Coach'
                list1 = 'Rowing and rugby coach'
                list2 = 'Serval years experience as a personal trainer'
                list3 = 'Competed in various fitness competitions'
                extraBody = 'I have worked as a personal fitness trainer for 10 years, training and coaching people though various training programs. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..'
                backgroundColor = 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              />
  
              <ProfileCard 
                image="/jessProfile.webp"
                name = 'Jess Miller'
                title = 'Physiotherapist'
                list1 = 'Professional physiotherapist for 5 years'
                list2 = 'Cat mom'
                list3 = 'Competed in various fitness competitions'
                extraBody = ' I am a fully trained and practising physio therapist. I have been working to More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder.. More more more, something here placeholder..'
                backgroundColor = 'linear-gradient(45deg, #FE6B8B 30%, #f07241 90%)'
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
      </section>
    );
})

export {About}