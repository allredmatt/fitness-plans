import { makeStyles }           from '@material-ui/core/styles';
import Paper                    from '@material-ui/core/Paper';
import Typography               from '@material-ui/core/Typography';
import MailOutlineIcon          from '@material-ui/icons/MailOutline';
import IconButton               from '@material-ui/core/IconButton';
import { Footer }               from './footer';

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
  margin: {
    margin: theme.spacing(1),
  },
}));

const Contact = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <section ref={ref} className={classes.slide}>
      <div className={classes.offset} />
      <Paper className={classes.container}>
        <Typography gutterBottom variant="h4" component="h1" color="textPrimary">
            Contact Us
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
            Please contact us by email if you need more information or  wish to sign up.
        </Typography>
        <IconButton aria-label="Email" className={classes.margin} href="mailto:millersfitnessandnutrition@gmail.com">
          <MailOutlineIcon fontSize="large" />
        </IconButton>
      </Paper>
      <Footer />
    </section>
  );
})

export {Contact}