import { nanoid } from "nanoid"
import PropTypes from "prop-types"
import { useState } from "react"

function Addtodo({data,setData,mainData,setMainData}) {
  let date= new Date()
  // {description:"Reshid",id:1,isCompleted:false,todoDate:"16 Sep 2004"}
  let [desc,setDesc]=useState("")
  function handleAddTodo(e){
    e.preventDefault()
    if(desc.length>3){
      console.log(desc)
      let newData = {description:desc,id:nanoid(),isCompleted:false,todoDate:date.getTime()}
      setData([...data,newData])
      setMainData([...mainData,newData])
      setDesc("")
    }
  }
  return (
    <>
      <form onSubmit={(e)=>{handleAddTodo(e)}}>
        <input onChange={(e)=>{setDesc(e.target.value)}} type="text" value={desc} />
        <button type="submit">Add ToDo</button>
      </form>
      
    </>
  )
}

Addtodo.propTypes={
  data:PropTypes.array,
  setData:PropTypes.func,
  mainData:PropTypes.array,
  setMainData:PropTypes.func
}
export default Addtodo
