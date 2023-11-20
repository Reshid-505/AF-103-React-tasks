import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { addProd } from '../API/prodrequest';
function AddCard({handleClose,open,setData}) {
    const [snackOpen, setSnackOpen] = useState(false);
  
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
        let date = new Date()
        if(name.length>2 && artistName.length>2 && genre.length>3 && albumCover.length>5 && year <= date.getFullYear() && year>0){
            let newProd={name,artistName,year,genre,albumCover,comments:[]}
            addProd(newProd)
            .then(datas=>setData(datas))
            handleClose()
        }else{
            handleSnackClick()
        }
    }

    let [name,setName]=useState("")
    let [artistName,setArtistName]=useState("")
    let [year,setYear]=useState("")
    let [genre,setGenre]=useState("")
    let [albumCover,setAlbumCover]=useState("")
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
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setName(e.target.value)}} label="Name" variant="outlined" />
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setArtistName(e.target.value)}} label="Artist name" variant="outlined" />
            <TextField id="outlined-number" type="number" InputLabelProps={{shrink: true,}} sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setYear(e.target.value)}} label="Year" variant="outlined" />
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setAlbumCover(e.target.value)}} label="Album cover" variant="outlined" />
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setGenre(e.target.value)}} label="Genre" variant="outlined" />
            <Button onClick={handleAdd} sx={{margin:"5px 0",width:"100%"}} variant="contained">Add</Button>
            </Box>
        </Modal>
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
            validation false
            </Alert>
        </Snackbar>
        </>
    )
}
AddCard.propTypes={
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    setData:PropTypes.func,
  }

export default AddCard
