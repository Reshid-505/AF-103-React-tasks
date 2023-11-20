import { useEffect, useState } from "react";
import Cards from "./components/Cards"
import Header from "./components/Header"
import Login from "./components/Login";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardItem from "./components/CardItem";
import { getAll } from "./API/prodrequest";
import Register from "./components/Register";
import AddCard from "./components/AddCard";

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  let [user,setUser] = useState(false)
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  let [data,setData] = useState([])
  let [dataFiltered,setDataFiltered] = useState([])
  useEffect(()=>{
    setDataFiltered([...data])
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
  const [filterGenre, setFilterGenre] = useState('');

  const handleGenreChange = (event) => {
    setFilterGenre(()=>{
      setDataFiltered([...data.filter(item=>(event.target.value=="All"?true:item.genre.toLowerCase().includes(event.target.value.toLowerCase())) )])
      return(event.target.value)}
      )
  };

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
    <div style={{textAlign:"center",display:"flex",justifyContent:"center",flexWrap:"wrap",gap:'15px',margin:"0 0 50px 0"}}>
      {user?user.isAdmin?(
        <>
          <Button variant="contained" onClick={handleOpenAdd}>Add</Button>
          <Button variant="outlined" onClick={()=>{setDataFiltered([...dataFiltered.sort((a,b)=>a.year-b.year)])}}>Sort by year</Button>
          <Button variant="outlined" onClick={()=>{JSON.stringify(dataFiltered)===JSON.stringify([...data.filter(item=>user.whishlistItems.includes(item.id))])?setDataFiltered([...data]):setDataFiltered([...data.filter(item=>user.whishlistItems.includes(item.id))])}}>Whishlist Filter</Button>
        </>
      ):(
        <>
          <Button variant="outlined" onClick={()=>{setDataFiltered([...dataFiltered.sort((a,b)=>a.year-b.year)])}}>Sort by year</Button>
          <Button variant="outlined" onClick={()=>{setDataFiltered([...data.filter(item=>user.whishlistItems.includes(item.id))])}}>Whishlist Filter</Button>
        </>
      ):(
        <>
        <Button variant="outlined" onClick={()=>{setDataFiltered([...dataFiltered.sort((a,b)=>a.year-b.year)])}}>Sort by year</Button>
      </>
      )}
      <span style={{display:"flex",flexWrap:"wrap",gap:"15px"}}>
      <div>
        <TextField id="outlined-basic" onChange={(e)=>{setDataFiltered(([...data.filter((item=>item.name.toLowerCase().includes(e.target.value.toLowerCase().trim())))]))}} sx={{margin:"0 auto"}} label="Search" variant="outlined" />
      </div>
      <div>
      <FormControl sx={{width:"200px"}}>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterGenre}
            label="Genre"
            onChange={handleGenreChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {data.map((item,index)=>{
              if(data.findIndex(i=>i.genre.toLowerCase() == item.genre.toLowerCase())==index){
                return(<MenuItem key={item.id} value={item.genre}>{item.genre}</MenuItem>)
              }
            })}
          </Select>
        </FormControl>
      </div>
      </span>
    </div>

    <AddCard open={openAdd} setData={setData} handleClose={handleCloseAdd} />

    <Cards >
      <Box sx={{ flexGrow: 1 }}>
        <Grid style={{maxWidth:"900px",margin:"0 auto"}} container spacing={2}>
          {dataFiltered?.map((item,index)=>{return(
            <Grid key={index} item xs={12} md={6} lg={4} >
              <CardItem user={user} setUser={setUser} item={item} dataFiltered={dataFiltered} setData={setData} data={data} />
            </Grid>
          )})}
        </Grid>
      </Box>
    </Cards>
    </>
  )
}


export default App

