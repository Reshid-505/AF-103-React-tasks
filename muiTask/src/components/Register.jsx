import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types"
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { AddUser, getAllUsers } from '../API/usersrequest';
function Register({open,handleClose,user}) {
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
  const iconStyle = {
    margin:"0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width:"35px",
    height:"35px",
    color:"#FFF",
    borderRadius:"50%",
    backgroundColor:"#9B26B3"
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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

  let [name,setName]=useState("")
  let [password,setPassword]=useState("")
  let [email,setEmail]=useState("")
  let [isAdmin,setIsAdmin]=useState("")
  let passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/ 
  function handleSubmit(){
    if(!user){
      getAllUsers()
      .then(data=>{
        let count=0
        for(let i=0;i<data.length;i++){
            if(!data.find(item=>item.name==name) && !data.find(item=>item.email==email) && count==0){
              if(name.length>2 && passwordRegex.test(password)){
                let date = new Date()
                let newUser={name,password,email,isAdmin,createdAt:date.getTime(),whislistItems:[]};
                AddUser(newUser)
                handleClose()
                count++
                break;
              }else{
                handleSnackClick()
              }
            }else{
                alert("this name or email already in use")
                break;
            }
        }
      })

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
          <Typography sx={iconStyle} id="modal-modal-icon" variant="div" component="div">
            <LockIcon />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            Register
          </Typography>
          <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setName(e.target.value)}} label="Username" variant="outlined" />
          <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="outlined" />
          {/* <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} label="Password" variant="outlined" /> */}
          <FormControl sx={{margin:"5px 0", width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onChange={(e)=>{setPassword(e.target.value)}}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControlLabel onClick={(e)=>{setIsAdmin(e.target.checked)}} control={<Checkbox />} label="is admin" />

          <Button onClick={handleSubmit}  sx={{margin:"5px 0",width:"100%"}} variant="contained">Register</Button>
        </Box>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
        name must be minimum 3 character and password must be minimum 5 character(1 lower, 1 upper and 1 number)
        </Alert>
      </Snackbar>

    </>
  )
}
Register.propTypes={
  open:PropTypes.bool,
  user:PropTypes.object,
  handleClose:PropTypes.func
}

export default Register
