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
                <Link style={{color:"white"}} to="/"><Button color="inherit">User</Button></Link>
                </Typography>
                <Link style={{color:"white"}} to=""><Button color="inherit">Dashboard</Button></Link>
                <Link style={{color:"white"}} to="/admin/categories"><Button color="inherit">categories</Button></Link>
                <Link style={{color:"white"}} to="/admin/add"><Button color="inherit">Add</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Header
