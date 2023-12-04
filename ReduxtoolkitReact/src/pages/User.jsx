import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
function User() {
    let navigate = useNavigate()
    const user = useSelector(state=>state.user.user)
    useEffect(()=>{
      if(JSON.stringify(user)=="{}"){
          navigate("/")
      }
  },[user])
  return (
    <>
      <h1>Username:{user.name}</h1>
      <h2>Password:{user.password}</h2>
      <h3>Admin:{JSON.stringify(user.isAdmin)}</h3>
    </>
  )
}

export default User
