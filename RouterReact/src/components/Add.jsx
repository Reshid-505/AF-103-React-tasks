import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { addCategory } from '../services/api/categoryRequests';
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  let [name,setName] = useState("")
  let [description,setDescription] = useState("")
  function handleSubmit(e){
    e.preventDefault()
    if(name.length>0 && description.length>0){
      addCategory({name,description})
      setName("")
      setDescription("")
      navigate("../../admin/categories")

    }
  }
  return (
    <form onSubmit={(e)=>{handleSubmit(e)}} style={{margin:"20px 10px"}}>
      <TextField style={{margin:"5px 0"}} onChange={(e)=>{setName(e.target.value)}} value={name} id="outlined-basic" label="Name" variant="outlined" /> <br />
      <TextField style={{margin:"5px 0"}} onChange={(e)=>{setDescription(e.target.value)}} value={description} id="outlined-basic" label="Description" variant="outlined" /> <br />
      <Button style={{margin:"5px 0"}} variant="contained" type='submit'>Add</Button>
    </form>
  )
}

export default Add
