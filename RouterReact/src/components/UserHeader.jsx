import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link style={{color:"white"}} to="/admin"><Button color="inherit">Admin</Button></Link>
                </Typography>
                <Link style={{color:"white"}} to=""><Button color="inherit">Home</Button></Link>
                <Link style={{color:"white"}} to="/about"><Button color="inherit">About</Button></Link>
                <Link style={{color:"white"}} to="/contact"><Button color="inherit">Contact</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>

      
    </>
  )
}

export default Header
