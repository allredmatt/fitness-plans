import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

export default function ProfileCard ({image, name, title, body, backgroundColor}) {

    const useStyles = makeStyles((theme) => ({
        card: {
            flex: '0 0 auto',
            width: 325,
            overflowY: 'auto',
            background: backgroundColor,
            marginRight: theme.spacing(1.5)
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
        </Card>
    )
}