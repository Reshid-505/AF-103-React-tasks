import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { editProd } from '../API/prodrequest';
function EditCard({handleClose,open,setData,item,data}) {
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
      
    let [name,setName]=useState(item.name)
    let [artistName,setArtistName]=useState(item.artistName)
    let [year,setYear]=useState(item.year)
    let [genre,setGenre]=useState(item.genre)
    let [albumCover,setAlbumCover]=useState(item.albumCover)
    function handleEdit(){
        let date = new Date()
        if(name.length>2 && artistName.length>2 && genre.length>2 && albumCover.length>5 && year <= date.getFullYear() && year>0){
            let itemFind=data.find(i=>i.id==item.id)
            let newProd={name,artistName,year,genre,albumCover}
            editProd(item.id,newProd)
            handleClose()
            itemFind.name=name
            itemFind.artistName=artistName
            itemFind.year=year
            itemFind.genre=genre
            itemFind.albumCover=albumCover
            setData([...data])
        }else{
            handleSnackClick()
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
                Edit
            </Typography>
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setName(e.target.value)}} value={name} label="Name" variant="outlined" />
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setArtistName(e.target.value)}} value={artistName} label="Artist name" variant="outlined" />
            <TextField id="outlined-number" type="number" InputLabelProps={{shrink: true,}} sx={{margin:"5px 0",width:"100%"}} value={year} onChange={(e)=>{setYear(e.target.value)}} label="Year" variant="outlined" />
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setAlbumCover(e.target.value)}} value={albumCover} label="Album cover" variant="outlined" />
            <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setGenre(e.target.value)}} value={genre} label="Genre" variant="outlined" />
            <Button onClick={handleEdit} sx={{margin:"5px 0",width:"100%"}} variant="contained">Edit</Button>
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
EditCard.propTypes={
    item:PropTypes.object,
    data:PropTypes.array,
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    setData:PropTypes.func,
  }

export default EditCard
