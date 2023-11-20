import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from "prop-types"
import { deleteProd } from '../API/prodrequest';
import { useEffect, useState } from 'react';
import { EditUser } from '../API/usersrequest';
import EditCard from './EditCard';


function CardItem({item,user,setUser,data,setData,dataFiltered}) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [likedSnackOpen, setLikedSnackOpen] = useState(false);
  
  const handleLikedSnackClick = () => {
    setLikedSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setLikedSnackOpen(false);
  };
  let [liked,setLiked]=useState(false)
  useEffect(()=>{
    setLiked(user.whishlistItems?user.whishlistItems.includes(item.id):false)
  },[user,dataFiltered])
  function handleDelete(){
    user.whishlistItems=user.whishlistItems.filter(i=>i!=item.id)
    setLiked(false)
    setUser({...user}) 
    EditUser(user.id,user)
    localStorage.setItem("user",JSON.stringify(user))
    setData([...data.filter(elem=>elem.id!=item.id)])
    deleteProd(item.id)
  }
  function handleLike(){
    setLiked(true)
    user.whishlistItems?.push(item.id)
    setUser({...user})
    EditUser(user.id,user)
    localStorage.setItem("user",JSON.stringify(user))
    handleLikedSnackClick()
  }
  function handleUnlike(){
    user.whishlistItems=user.whishlistItems.filter(i=>i!=item.id)
    setLiked(false)
    setUser({...user}) 
    EditUser(user.id,user)
    localStorage.setItem("user",JSON.stringify(user))
  }
  
  return (
    <>
      <EditCard open={openEdit} data={data} item={item} setData={setData} handleClose={handleCloseEdit} />
      <Card sx={{ maxWidth: 345,margin:"0 auto" }}>
        <CardMedia
          component="img"
          alt={item.name}
          height="140"
          image={item.albumCover}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {item.artistName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {item.year}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {item.genre}
          </Typography>
        </CardContent>
        <CardActions>
          {user.isAdmin?(
            <>
              <Button size="small" onClick={handleDelete}>Delete</Button>
              <Button size="small" onClick={handleOpenEdit}>Edit</Button>
            </>
          ):null}
          {user?liked?<FavoriteIcon onClick={handleUnlike} />:<FavoriteBorderIcon onClick={handleLike} />:null}
        </CardActions>
      </Card>
      <Snackbar open={likedSnackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            Added wishlist
        </Alert>
      </Snackbar>
    </>
  )
}
CardItem.propTypes={
  item:PropTypes.object,
  data:PropTypes.array,
  dataFiltered:PropTypes.array,
  setData:PropTypes.func,
  setUser:PropTypes.func,
  user:PropTypes.object,
}

export default CardItem
