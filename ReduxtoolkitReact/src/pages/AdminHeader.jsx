import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logoutUser } from '../services/redux/slices/userSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  

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
                    <Link to={"/user"}>
                        <Button sx={{color:"#FFF"}}>{user.name}</Button>
                    </Link>
                    <Button onClick={()=>{dispatch(logoutUser())}} sx={{color:"#FFF"}}>Logout</Button>
                </>)}
                <Link to={"/admin"}>
                    <Button sx={{color:"#FFF"}}>products</Button>
                </Link>
                {JSON.stringify(user)!="{}"?(
                    <Link to={"/basket"}>
                        <IconButton aria-label="cart" sx={{color:"#FFF"}}>
                            <StyledBadge color="error">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </Link>
                ):null}
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default UserHeader
