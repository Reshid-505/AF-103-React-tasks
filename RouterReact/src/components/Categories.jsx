import { useState } from "react"
import { getAll } from "../services/api/categoryRequests"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";


function Categories() {
  let [data,setData] = useState([])
  
  getAll()
  .then(datas=>setData(datas))
  return (
    <>
         {/* {data?.map()} */}
         <Grid item sx={{width:"50%",margin:"0 auto"}} xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Categories
          </Typography>
            <List>
              {data?.map((elem,idx)=>{return(
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Link style={{color:"black"}} to={`../details/${elem.id}`}>
                        <InfoIcon />
                      </Link>
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={elem.name}
                  />
                </ListItem>)})}
            </List>
        </Grid>

    </>
  )
}

export default Categories
