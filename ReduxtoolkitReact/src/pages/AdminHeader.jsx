import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from '../services/redux/slices/userSlice';  

function UserHeader() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='error'>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    React redux task
                </Typography>
                {JSON.stringify(user)=="{}"?(
                    <>
                        <Link to={"/admin/login"}>
                            <Button sx={{color:"#FFF"}}>Login</Button>
                        </Link>
                    </>
                ):(<>
                    <Button sx={{color:"#FFF"}}>{user.name}</Button>
                    <Link to={"/admin/users"}>
                        <Button sx={{color:"#FFF"}}>users</Button>
                    </Link>
                    <Button onClick={()=>{dispatch(logoutUser())}} sx={{color:"#FFF"}}>Logout</Button>
                </>)}
                <Link to={"/admin"}>
                    <Button sx={{color:"#FFF"}}>products</Button>
                </Link>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default UserHeader
