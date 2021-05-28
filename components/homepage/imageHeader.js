import { makeStyles }           from '@material-ui/core/styles';
import Paper                    from '@material-ui/core/Paper';
import Typography               from '@material-ui/core/Typography';
import Image                    from 'next/image'

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
    bannerImage:{
        position: 'absolute',
        overflow: 'hidden',
        //top: '50%',
        maxWidth: '100vw',
    },
    imageWrapper:{
        width: 'max(500px, 100%)',
        transform: 'translate(-10%, 10%)',
        objectFit: 'contain'
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
    wrapper:{
        position: 'absolute',
        top: '35%',
        transform: 'translate(0%, -25%)',
        paddingLeft: '70px',
        paddingRight: '100px',
        maxWidth: '100vw',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)',
    },
    verticalPad:{
        paddingTop: '60px',
        paddingBottom: '60px',
    },
  }));

const HomeHeader = () => {
    const classes = useStyles();
  
    return (
      <section className={classes.slide}>
        <div className={classes.offset} />
        <div className={classes.bannerImage}>
          <div className={classes.imageWrapper}>
          <Image
            src="/turfgames.webp"
            alt="Human Pyramid with Ed and Jess Miller"
            width={960}
            height={1130}
            layout="intrinsic"
          />
          </div>
        </div>
        <Paper className={classes.container} elevation={0}>
          <div className={classes.wrapper}>
            <div className={classes.verticalPad}>
              <Typography variant='h2' color="secondary">Millers Fitness and Nutrition</Typography>
            </div>
          </div>
        </Paper>
      </section>
    );
}

export {HomeHeader}

/*

*/