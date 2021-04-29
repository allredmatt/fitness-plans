import { useState, useContext }           from 'react';
import Link                               from "next/link";
import { makeStyles}                      from '@material-ui/core/styles';
import AppBar                             from '@material-ui/core/AppBar';
import Toolbar                            from '@material-ui/core/Toolbar';
import Typography                         from '@material-ui/core/Typography';
import IconButton                         from '@material-ui/core/IconButton';
import Drawer                             from '@material-ui/core/Drawer';
import ListItem                           from '@material-ui/core/ListItem';
import ListItemText                       from '@material-ui/core/ListItemText';
import ListItemIcon                       from '@material-ui/core/ListItemIcon';
import List                               from '@material-ui/core/List';
import Divider                            from '@material-ui/core/Divider';
import MenuIcon                           from '@material-ui/icons/Menu';
import HomeIcon                           from '@material-ui/icons/Home';
import InfoIcon                           from '@material-ui/icons/Info';
import FitnessCenterIcon                  from '@material-ui/icons/FitnessCenter';
import ContactsIcon                       from '@material-ui/icons/Contacts';
import PersonIcon                         from '@material-ui/icons/Person';
import RestaurantIcon                     from '@material-ui/icons/Restaurant';
import ExitToAppIcon                      from '@material-ui/icons/ExitToApp';
import EventIcon                          from '@material-ui/icons/Event';
import ViewListIcon                       from '@material-ui/icons/ViewList';
import Hidden                             from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      webkitUserSelect: "none",  
      mozUserSelect: "none",    
      msUserSelect: "none",      
      userSelect: "none",
    },
    menu: {
      width: 250
    },
    appBar:{
      backgroundColor: theme.palette.primary.main,
      position: 'fixed'
    },
    backColour:{
      backgroundColor: theme.palette.secondary.main,
    }
}));

export function TopBar({scrollToRef}) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseMenu = () => {
    setIsDrawerOpen(false);
  };

  const handleListClick = (ref) => {
    handleCloseMenu()
    scrollToRef(ref)
  }

  const classes = useStyles();

  return (
      <div className={classes.root}>
      <AppBar className={classes.appBar} color="primary">
          <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            onClick={handleMenuClick}
            >
              <MenuIcon aria-controls="simple-menu" aria-haspopup="true" />
            </IconButton>
            <Drawer
                id="simple-menu"
                anchor="left"
                open={isDrawerOpen}
                onClose={handleCloseMenu}
              >
            <div className={classes.menu}>
              <List>
                <Link href="/"><ListItem button onClick={handleCloseMenu}>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem></Link>
                <div>
                  <ListItem button onClick={() => handleListClick("about")}>
                  <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary="About Us" />
                  </ListItem>
                  <ListItem button onClick={() => handleListClick("service")}>
                    <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
                    <ListItemText primary="Our Services" />
                  </ListItem>
                  <ListItem button onClick={() => handleListClick("contact")}>
                    <ListItemIcon><ContactsIcon /></ListItemIcon>
                    <ListItemText primary="Contact Us" />
                  </ListItem>
                  <Divider />
                  <Link href="/user"><ListItem button onClick={handleCloseMenu}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="User Login" />
                  </ListItem></Link>
                </div>
              </List>
            </div>
            </Drawer>
            <Hidden xsDown>
              <Link href="/">
              <Typography variant="h6" className={classes.title}>
                Millers Fitness and Nutrition
              </Typography>
              </Link>
            </Hidden>
            <Hidden smUp>
              <Link href="/">
              <Typography variant="h6" className={classes.title}>
                Millers Fitness
              </Typography>
              </Link>
            </Hidden>
          </Toolbar>
      </AppBar>
      <Toolbar />
      <Divider className={classes.backColour}/>
      </div>
  );
}

export function AuthedTopBar({logout, setUserAreaToDisplay}) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseMenu = () => {
    setIsDrawerOpen(false);
  };

  const handleListClick = (ref) => {
    handleCloseMenu()
    setUserAreaToDisplay(ref)
  }

  const classes = useStyles();

  return (
      <div className={classes.root}>
      <AppBar className={classes.appBar}>
          <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            onClick={handleMenuClick}
            >
              <PersonIcon aria-controls="simple-menu" aria-haspopup="true" />
            </IconButton>
            <Drawer
                id="simple-menu"
                anchor="left"
                open={isDrawerOpen}
                onClose={handleCloseMenu}
              >
            <div className={classes.menu}>
              <List>
                <Link href="/"><ListItem button onClick={handleCloseMenu}>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem></Link>
                <Divider />
                <div>
                  <ListItem button onClick={() => handleListClick("food")}>
                  <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary="Food Diary" />
                  </ListItem>
                  <ListItem button onClick={() => handleListClick("feedback")}>
                    <ListItemIcon><RestaurantIcon /></ListItemIcon>
                    <ListItemText primary="Food Feedback" />
                  </ListItem>
                  <ListItem button onClick={() => handleListClick("plan")}>
                    <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
                    <ListItemText primary="Daily Sessions" />
                  </ListItem>
                  <ListItem button onClick={() => handleListClick("whole")}>
                    <ListItemIcon><ViewListIcon /></ListItemIcon>
                    <ListItemText primary="All Sessions" />
                  </ListItem>
                </div>
                <Divider />
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToAppIcon  /></ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <Hidden xsDown>
              <Link href="/">
              <Typography variant="h6" className={classes.title}>
                Millers Fitness and Nutrition
              </Typography>
              </Link>
            </Hidden>
            <Hidden smUp>
              <Link href="/">
              <Typography variant="h6" className={classes.title}>
                Millers Fitness
              </Typography>
              </Link>
            </Hidden>
          </Toolbar>
      </AppBar>
      <Toolbar />
      <Divider className={classes.backColour}/>
      </div>
  );
}