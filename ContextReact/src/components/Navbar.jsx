import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import BasketData from '../services/context/basketContext';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  

function Navbar() {
    let {basket} = useContext(BasketData)
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
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    React context task
                </Typography>
                <Link to={"/"}>
                <Button sx={{color:"#FFF"}}>Categories</Button>
                </Link>
                <Link to={"/basket"}>
                <IconButton aria-label="cart" sx={{color:"#FFF"}}>
                    <StyledBadge badgeContent={basket.length} color="error">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>

                </Link>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Navbar
