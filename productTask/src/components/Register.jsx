import PropTypes from "prop-types"
import { useState } from "react"
import { AddUser, getAllUsers } from "../api/usersrequest"

function Register({setRegisterForm}) {
  let [name,setName]=useState("")
  let [password,setPassword]=useState("")
  let [email,setEmail]=useState("")
  let [isAdmin,setIsAdmin]=useState(false)
  function handleSubmit(e){
    e.preventDefault()
    getAllUsers()
    .then(data=>{
      let count=0;
      data.forEach(item=>{
        if(item.name==name || item.email==email){
          count++
        }
      })
      if(!count){
        if(name.length>2 && password.length>5 && email.length>5){
          let newUser = {name,password,email,isAdmin}
          AddUser(newUser)
          setRegisterForm(false)
        }else{
          alert("name must contain minimum 3 element, password must contain minimum 5 element, email must contain minimum 5 element")
        }
      }else{
        alert("this name or email is already in use")
      }
    })
  }
  return (
    <>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
      <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="name" />
      <input onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder="password"/>
      <input onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder="email"/>
      <label>Admin <input onChange={(e)=>{setIsAdmin(e.target.checked)}}  type="checkbox"/></label>
      <button type="submit">confirm</button>
      <button onClick={()=>{setRegisterForm(false)}}>cancel</button>
    </form>
      
    </>
  )
}
Register.propTypes={
  setRegisterForm:PropTypes.func
}

export default Register
