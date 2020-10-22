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
import { userContext }                    from '../context/checkUser'
import HomeIcon                           from '@material-ui/icons/Home';
import InfoIcon                           from '@material-ui/icons/Info';
import FitnessCenterIcon                  from '@material-ui/icons/FitnessCenter';
import ContactsIcon                       from '@material-ui/icons/Contacts';
import PersonIcon                         from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: 410,
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
      position: 'fixed'
    }
}));

export default function TopBar({scrollToRef}) {

  const user = useContext(userContext)
  let userLoggedIn = user.isLoggedIn

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

  const handleLogout = () => {
    user.setUserName('')
    localStorage.removeItem('UserId')
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
                
                {userLoggedIn ?
                <div>
                  <Divider />
                  <Link href="/users/"><ListItem button onClick={handleCloseMenu}>Account Home</ListItem></Link>
                  <Link href="/users/food"><ListItem button onClick={handleCloseMenu}><ListItemText primary="Food Diary" /></ListItem></Link>
                  <Link href="/users/fitness"><ListItem button onClick={handleCloseMenu}><ListItemText primary="Fitness Plan" /></ListItem></Link>
                  <Link href="/users/workouts"><ListItem button onClick={handleCloseMenu}><ListItemText primary="My Workouts" /></ListItem></Link>
                  <ListItem button onClick={handleLogout}><ListItemText primary="Log Out" /></ListItem>
                </div>
                :
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
                  <Link href="/login"><ListItem button onClick={handleCloseMenu}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="User Login" />
                  </ListItem></Link>
                </div>
                }
              </List>
            </div>
            </Drawer>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              Millers Fitness and Nutrition
            </Typography>
          </Link>
          </Toolbar>
      </AppBar>
      <Toolbar />
      </div>
  );
}