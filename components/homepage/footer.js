import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
    
const useStyles = makeStyles((theme) => ({
    container: {
        width: 'min(98vw, 1920px)',
        height: 'min(20%, 144px)',
        position: 'absolute',
        bottom: theme.spacing(1),
        backgroundImage: 'url("bottomBorderMax.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom'
    },
    text:{
        position: 'absolute',
        bottom: theme.spacing(2),
        left: '45%',
        textAlign: 'right',
        paddingRight: theme.spacing(1.5),
    },
    flex:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
}))

export default function Endorsement ({name, quote}) {

    const classes = useStyles()


    return (
        <div className={classes.container}>
            <span className={classes.text}>
            <div className={classes.flex}>
            <FormatQuoteIcon style={{ color: '#fafafa', fontSize: 40 }} className={classes.quote}/>
            <Typography variant='h6' color='textSecondary'>
                <b><i>{name}:</i></b>
            </Typography>
            </div>
            <Typography variant='h5' color='textSecondary'>
                <i>{quote}</i>
            </Typography>
            
            </span>
            
     </div>
    )
}

export function EndorsementSmall ({name, quote}) {

    const classes = useStyles()


    return (
        <div className={classes.container}>
            <span className={classes.text}>
            <div className={classes.flex}>
            <FormatQuoteIcon style={{ color: '#fafafa', fontSize: 24 }} className={classes.quote}/>
            <Typography variant='body2' color='textSecondary'>
                <b><i>{name}:</i></b>
            </Typography>
            </div>
            <Typography variant='body1' color='textSecondary'>
                <i>{quote}</i>
            </Typography>
            
            </span>
            
     </div>
    )
}

export function Footer () {

    const classes = useStyles()


    return (
        <div className={classes.container}>
            <span className={classes.text}>
            <div className={classes.flex}>
            <Typography variant='body1' color='textSecondary'>
                <b><i>Developer: </i></b><i>Matt Allred</i>
            </Typography>
            </div>
            </span>
     </div>
    )
}