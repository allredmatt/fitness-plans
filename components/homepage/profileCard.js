import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Divider, IconButton, Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AdjustIcon from '@material-ui/icons/Adjust';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';


export default function ProfileCard ({image, name, title, list1, list2, list3, backgroundColor, extraBody}) {

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
          itemTitle:{
            marginLeft: 'auto',
            gridArea: 'title'
          },
          itemList:{
            color: theme.palette.text.secondary,
            gridArea: 'body'
          },
        })
    )
    const [isModalOpen, setIsModalOpen] = useState(false)

    const classes = useStyles()

    return(
    <React.Fragment>
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
          <List variant="body2" color="textSecondary" component="p" disablePadding className={classes.itemList}>
            <ListItem >
              <ListItemIcon>
                  <AdjustIcon />
                </ListItemIcon>
              <ListItemText primary={list1}/>
            </ListItem>
            <ListItem >
              <ListItemIcon>
                  <AdjustIcon />
                </ListItemIcon>
              <ListItemText primary={list2}/>
            </ListItem>
            <ListItem >
              <ListItemIcon>
                  <AdjustIcon />
                </ListItemIcon>
              <ListItemText primary={list3}/>
            </ListItem>
          </List>
        </div>
      </CardContent>
      <CardActions>
          <Button
            color="primary"
            size='small'
            variant='outlined'
            onClick={() => setIsModalOpen(true)}
          >
            Read More...
          </Button>
      </CardActions>
    </Card>
    <ExtraInfoDialog 
      heading={`${name} - ${title}`}
      text={extraBody}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      backgroundColor={backgroundColor}
    />
    </React.Fragment>
    )
}

function ExtraInfoDialog ({heading, text, isOpen, setIsOpen, backgroundColor}) {

  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    paper:{
      padding: theme.spacing(2),
      background: backgroundColor
    },
    DialogTitle:{
      background: theme.palette.primary.dark
    }
  }))

  const classes = useStyles()

  function onClose () {
    setIsOpen(false)
  }

  return(
    <Dialog 
      onClose={onClose} 
      aria-labelledby="More information" 
      open={isOpen}
      fullWidth
      maxWidth= 'md'
    >
      <DialogTitle id="dialog-title" className={classes.dialogTitle}>
        <Typography variant="h6">{heading}</Typography>
        <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Paper className={classes.paper} square>
        <Typography color='textSecondary'>
          {text}
        </Typography>
      </Paper>
    </Dialog>
  )
}