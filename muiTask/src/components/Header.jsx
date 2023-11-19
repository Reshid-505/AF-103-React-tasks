import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PropTypes from "prop-types"
import MenuIcon from '@mui/icons-material/Menu';import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';



function Header({handleOpenLogin,handleOpenRegister,user,setUser}) {

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!user?(
      <List>
        <ListItem onClick={handleOpenLogin}>
            <Button  color="inherit">Login</Button>
        </ListItem>
        <ListItem onClick={handleOpenRegister}>
            <Button color="inherit">Register</Button>
        </ListItem>
      </List>
      ):(
      <List>
        <ListItem>
            <h1>{user.name}</h1>
        </ListItem>
        <ListItem>
            <Button 
            onClick={()=>{
              setUser(false)
              localStorage.setItem("user",JSON.stringify(false))
            }}
            color="inherit" >Log out</Button>
        </ListItem>
      </List>

      )}
    </Box>
  );



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <CameraAltIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Album layout
            </Typography>
            <MenuIcon onClick={toggleDrawer("right", true)} />
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>

    </>
  )
}
Header.propTypes={
  handleOpenLogin:PropTypes.func,
  handleOpenRegister:PropTypes.func,
  user:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
  setUser:PropTypes.func,
}
export default Header
