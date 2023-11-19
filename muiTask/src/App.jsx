import { useEffect, useState } from "react";
import Cards from "./components/Cards"
import Header from "./components/Header"
import Login from "./components/Login";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import CardItem from "./components/CardItem";
import { getAll } from "./API/prodrequest";
import Register from "./components/Register";
import AddCard from "./components/AddCard";

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  let [user,setUser] = useState(false)
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  let [data,setData] = useState([])
  let [dataFiltered,setDataFiltered] = useState([])
  useEffect(()=>{
    setDataFiltered(data)
  },[data])
  useEffect(()=>{
    getAll()
    .then(datas=>setData(datas))
    if(JSON.parse(localStorage.getItem("user"))){
      setUser(JSON.parse(localStorage.getItem("user")))
    }else{
      localStorage.setItem("user",JSON.stringify(user))
    }
  },[])
  let styleH1={
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: "300",
    fontSize: "3.75rem",
    lineHeight: "1.2",
    letterSpacing: "-0.00833em",
    textAlign: "center",
    marginBottom: "0.35em",
    marginTop: "64px",
    color: "rgba(0, 0, 0, 0.87)",
  }
  let styleH3={
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: "400",
    fontSize: "1.5rem",
    lineHeight: "1.334",
    letterSpacing: "0em",
    textAlign: "center",
    margin:"0 auto",
    maxWidth:"550px",
    marginBottom: "16px",
    color: "rgba(0, 0, 0, 0.6)",

  }

  return (
    <>
    <Header handleOpenLogin={handleOpenLogin} handleOpenRegister={handleOpenRegister} user={user} setUser={setUser} />
    <Login open={openLogin} user={user} setUser={setUser} handleClose={handleCloseLogin} />
    <Register open={openRegister} handleClose={handleCloseRegister} />
    <h1 style={styleH1}>Album layout</h1>
    {/* eslint-disable-next-line react/no-unescaped-entities */}
    <h3 style={styleH3} >Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</h3>
    <div style={{textAlign:"center",display:"flex",justifyContent:"center",gap:'15px',margin:"0 0 50px 0"}}>
      {user.isAdmin?(
        <>
          <Button variant="contained" onClick={handleOpenAdd}>Add</Button>
          <Button variant="outlined">Secondary action</Button>
        </>
      ):null}
      <div>
        <TextField id="outlined-basic" onChange={(e)=>{setDataFiltered(([...data.filter((item=>item.name.toLowerCase().includes(e.target.value.toLowerCase().trim())))]))}} sx={{margin:"0 auto"}} label="Outlined" variant="outlined" />
      </div>
    </div>

    <AddCard open={openAdd} setData={setData} handleClose={handleCloseAdd} />

    <Cards >
      <Box sx={{ flexGrow: 1 }}>
        <Grid style={{maxWidth:"900px",margin:"0 auto"}} container spacing={2}>
          {dataFiltered?.map((item,index)=>{return(
            <Grid key={index} item xs={12} md={6} lg={4} >
              <CardItem user={user} setUser={setUser} item={item} handleOpen={handleOpenEdit} open={openEdit} setData={setData} handleClose={handleCloseEdit} data={data} />
            </Grid>
          )})}
        </Grid>
      </Box>
    </Cards>
    </>
  )
}


export default App

