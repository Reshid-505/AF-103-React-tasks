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
import { useState } from 'react';
import { getAllUsers } from '../API/usersrequest';






function Login({user,setUser,open,handleClose}) {
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
  let [name,setName]=useState("")
  let [password,setPassword]=useState("")
  function handleSubmit(){
    if(!user){
      getAllUsers()
      .then(data=>{
        let count=0
        data.forEach(item=>{
          if(item.name==name && item.password==password){
            setUser(item)
            localStorage.setItem("user",JSON.stringify(item))
            handleClose()
          }else{
            count++
          }
        })
        if(data.length==count){
          alert("name or password wrong")
        }
      })
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            Login
          </Typography>
          <TextField id="outlined-basic" sx={{margin:"5px 0",width:"100%"}} onChange={(e)=>{setName(e.target.value)}} label="Username" variant="outlined" />
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
          <Button onClick={handleSubmit}  sx={{margin:"5px 0",width:"100%"}} variant="contained">Login</Button>
        </Box>
      </Modal>
      
    </>
  )
}
Login.propTypes={
  open:PropTypes.bool,
  user:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
  setUser:PropTypes.func,
  handleClose:PropTypes.func
}


export default Login
