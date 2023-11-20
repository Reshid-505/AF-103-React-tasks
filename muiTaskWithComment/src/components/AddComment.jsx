import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types"
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { editProd } from '../API/prodrequest';
function AddComment({handleClose,open,setData,data,item,user}) {
  const [ratingValue, setRatingValue] = useState(0);
  const [commentText, setCommentText] = useState(0);
  const [snackOpen, setSnackOpen] = useState(false);
  useEffect(()=>{
    setRatingValue(0)
  },[open])
  const handleSnackClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      p: 4,
      textAlign:"center",
    };
    function handleAdd(){
      if(commentText.length>2){
        let newComment={id:nanoid(),commentText,rating:ratingValue,userId:user.id}
        let itemFind=data.find(i=>i.id==item.id)
        itemFind.comments=[...itemFind.comments,newComment]
        editProd(item.id,item)
        handleSnackClick()
        handleClose()
        setData([...data])
      }
    }
  return (
    <>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
              Add
          </Typography>
          <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setCommentText(e.target.value)}} label="Comment" variant="outlined" />
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
          <Button onClick={handleAdd} sx={{margin:"5px 0",width:"100%"}} variant="contained">Add</Button>
          </Box>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            Comment Added
            </Alert>
        </Snackbar>
    </>
  )
}
AddComment.propTypes={
  item:PropTypes.object,
  open:PropTypes.bool,
  handleClose:PropTypes.func,
  setData:PropTypes.func,
  data:PropTypes.array,
  user:PropTypes.any
}

export default AddComment
