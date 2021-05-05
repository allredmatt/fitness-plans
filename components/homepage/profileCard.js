import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Link from '@material-ui/core/Link'
import CardActions from '@material-ui/core/CardActions'

export default function ProfileCard ({image, name, title, body, backgroundColor, linkToPath}) {

    const useStyles = makeStyles((theme) => ({
        card: {
            flex: '0 0 auto',
            width: 315,
            overflowY: 'auto',
            background: backgroundColor,
            marginRight: theme.spacing(1.5),
            padding: theme.spacing(-1)
          },
          profileContainer:{
            display: 'grid',
            gridTemplateColumns: '128px auto',
            gridTemplateRows: 'auto',
            gridTemplateAreas: 
              `"image . "
               "image name"
               "image title"
               "body body"`,
          },
          profileImage: {
            height: 120,
            width: 120,
            marginRight: theme.spacing(1.5),
            gridArea: 'image'
          },
          itemName:{
            marginLeft: 'auto',
            gridArea: 'name'
          },
          itemBody:{
            gridArea: 'body'
          },
          itemTitle:{
            marginLeft: 'auto',
            gridArea: 'title'
          },
          linkBorder:{
            border: '1px solid',
            borderRadius: theme.spacing(0.5),
            paddingLeft: theme.spacing(0.3),
            paddingTop: theme.spacing(0.2),
            paddingBottom: theme.spacing(0.1),
            paddingRight: theme.spacing(0.2)
          }
        })
    )

    const classes = useStyles()

    return(
    <Card className={classes.card}>
        <CardContent>
            <div className={classes.profileContainer}>
                <Avatar 
                  className={classes.profileImage}
                  src={image}
                  alt={`Headshot of ${name}`}
                />              
              <Typography color='textSecondary' variant="h5" className={classes.itemName}>
                <b>{name}</b>
              </Typography>
              <Typography color='textSecondary' variant="body1" className={classes.itemTitle}>
                <b><i>{title}</i></b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.itemBody}>
                {body}
              </Typography>
            </div>
        </CardContent>
        { linkToPath ?
        <CardActions>
            <Link
              color="textSecondary"
              underline="none"
              href={linkToPath}
              className={classes.linkBorder}
            >
                Read More...
            </Link>
            </CardActions>
            : null
        } 
        </Card>
    )
}