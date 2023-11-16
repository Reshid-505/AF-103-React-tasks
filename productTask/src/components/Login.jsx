import PropTypes from "prop-types"
import { getAllUsers } from "../api/usersrequest"
import { useState } from "react"
function Login({user,setUser,setLoginForm}) {
  let [name,setName]=useState("")
  let [password,setPassword]=useState("")
  function handleSubmit(e){
    e.preventDefault()
    if(!user){
      getAllUsers()
      .then(data=>{
        let count=0
        data.forEach(item=>{
          if(item.name==name && item.password==password){
            console.log(item)
            setUser(item)
            setLoginForm(false)
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
  return (
    <>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
      <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="name" />
      <input onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder="password"/>
      <button type="submit">confirm</button>
      <button onClick={()=>{setLoginForm(false)}}>cancel</button>
    </form>
      
    </>
  )
}
Login.propTypes={
  user:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
  setUser:PropTypes.func,
  setLoginForm:PropTypes.func
}

export default Login
