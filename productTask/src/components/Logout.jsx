import PropTypes from "prop-types"
function Logout({setUser}) {
  return (
    <>
      <button onClick={()=>{setUser(false)}}>Log Out</button> 
    </>
  )
}
Logout.propTypes={
  setUser:PropTypes.func
}
export default Logout
