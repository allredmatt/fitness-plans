import { useState }                       from 'react';
import Link                               from "next/link";
import { makeStyles}                      from '@material-ui/core/styles';
import AppBar                             from '@material-ui/core/AppBar';
import Toolbar                            from '@material-ui/core/Toolbar';
import Typography                         from '@material-ui/core/Typography';
import IconButton                         from '@material-ui/core/IconButton';
import Menu                               from '@material-ui/core/Menu';
import MenuItem                           from '@material-ui/core/MenuItem';
import Divider                            from '@material-ui/core/Divider';
import MenuIcon                           from '@material-ui/icons/Menu';


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
}));

export default function TopBar({userId}) {

  const [anchorMenuEl, setAnchorMenuEl] = useState(null);
  const [anchorLoginEl, setAnchorLoginEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorMenuEl(event.currentTarget);
  };
  const handleLoginClick = (event) => {
    setAnchorLoginEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    console.log(event.currentTarget.firstChild?.data);
    setAnchorMenuEl(null);
    setAnchorLoginEl(null);
  };

  const classes = useStyles();

  return (
      <div className={classes.root}>
      <AppBar position="static">
          <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu" 
            >
              <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}/>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorMenuEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  open={Boolean(anchorMenuEl)}
                  onClose={handleCloseMenu}
                >
              <Link href="/signup"><MenuItem onClick={handleCloseMenu}>Sign Up</MenuItem></Link>
              <Link href="/about"><MenuItem onClick={handleCloseMenu}>About Us</MenuItem></Link>
              <Divider />
              <Link href="/myaccount"><MenuItem onClick={handleCloseMenu}>User Area</MenuItem></Link>
              </Menu>
          </IconButton>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              Millers Fitness and Nutrition
            </Typography>
          </Link>
          </Toolbar>
      </AppBar>
      </div>
  );
}