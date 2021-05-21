import { makeStyles }                       from '@material-ui/core/styles';
import Card                                 from '@material-ui/core/Card';
import Paper                                from '@material-ui/core/Paper';
import CardContent                          from '@material-ui/core/CardContent';
import Typography                           from '@material-ui/core/Typography';
import CardMedia                            from '@material-ui/core/CardMedia';
import List                                 from '@material-ui/core/List';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import Hidden                               from '@material-ui/core/Hidden'
import CheckCircleOutlineIcon               from '@material-ui/icons/CheckCircleOutline';
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

        backgroundColor: theme.palette.primary.light
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
    serviceCard1: {
        flex: '0 0 auto',
        width: 325,
        overflowY: 'auto',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #f07241 90%)',
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
        background: 'linear-gradient(45deg, #cf7c19  30%, #f29f3a 90%)',
        marginRight: theme.spacing(1.5)
    },
    media: {
        [theme.breakpoints.down('sm')]:{
          height: 80
        },
        height: 120,
        marginBottom: theme.spacing(1),
    },
    textSecondary:{
        color: theme.palette.text.secondary
    },
}))

const Services = React.forwardRef((props, ref) => {

    const classes = useStyles();
  
    return (
      <section ref={ref} className={classes.slide}>
        <div className={classes.offset} /> 
          <Paper className={classes.container}>
            <div className={classes.infoContainer}>
              <Typography gutterBottom variant="h4" component="h1" color="textPrimary">
                  Our Services
              </Typography>
              <Hidden xsDown>
                <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                  Depending on what you wish to achieve we offer a range of bespoke services.
                </Typography>
              </Hidden>
              <div className={classes.flexDiv}>
                <ServiceCard
                  key='card1'
                  cardImage='/veg.jpg'
                  cardImageAlt='Different Vegetables'
                  cardTitle='Diet Analysis'
                  list1='Assess your diet against recommended guidelines'
                  list2='Check your intake of nutrients'
                  list3='Work out how to improve any periods of hunger'
                  cardCss={classes.serviceCard1}
                />

                <ServiceCard
                  key='card2'
                  cardImage='/running.jpg'
                  cardImageAlt='Feet of someone Running'
                  cardTitle='Fitness plans'
                  list1='Consult with you to ascertain your goals'
                  list2='Develop a schedule for you to follow'
                  list3='Use of fitness plan and tracking web app'
                  cardCss={classes.serviceCard2}
                />
      
                <ServiceCard
                  key='card3'
                  cardImage='/tape.jpg'
                  cardImageAlt='Tape measure wrapped around a pepper'
                  cardTitle='Combined Service'
                  list1='All the items included in the other package'
                  list2='Match your diet against your fitness plan'
                  list3='Ensure these work in tandem to support you'
                  cardCss={classes.serviceCard3}
                />
              </div>
          </div>
        <Hidden smDown>
          <Endorsement name='Tracey' quote='Really helped me feel less hungry throughout the day' />
        </Hidden>
        <Hidden only={['xs', 'md', 'lg', 'xl']}>
          <EndorsementSmall name='Tracey' quote='Really helped me feel less hungry throughout the day' />
        </Hidden>
        </Paper>
      </section>
    );
})

const ServiceCard = ({cardImage, cardImageAlt, cardTitle, list1, list2, list3, cardCss}) => {

  const classes = useStyles()

  return(
    <Card className={cardCss}>
      <CardMedia
        className={classes.media}
        image={cardImage}
        title={cardImageAlt}
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="h3">
          <b>{cardTitle}</b>
        </Typography>
        <List className={classes.textSecondary} disablePadding >
          <ListItem >
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={list1}/>
          </ListItem>

          <ListItem >
          <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={list2} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={list3} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export { Services }