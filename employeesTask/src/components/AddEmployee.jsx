import { useState } from "react"
import PropTypes from "prop-types"
import { nanoid } from "nanoid"

function AddEmployee({setAddForm,data,setData}) {
  let [name,setName]=useState("")
  let [age,setAge]=useState("")
  let [salary,setSalary]=useState("")
  function handleAdd(e){
    e.preventDefault()
    if(name.length>3){
      let date= new Date()
      let newData = {id:nanoid(),name:name,age:Number(age),salary:Number(salary),isFired:false,createdAt:date.getTime(),updatedAt:0}
      setData([...data,newData])
      setAddForm(false)
    }
  }
  return (
    <>
      <form onSubmit={(e)=>{handleAdd(e)}}>
        <input onChange={(e)=>{setName(e.target.value)}} type="text" value={name} placeholder="name" />
        <input onChange={(e)=>{setAge(e.target.value)}} type="number" value={age} placeholder="age" />
        <input onChange={(e)=>{setSalary(e.target.value)}} type="number" value={salary} placeholder="salary" />
        <button type="submit">confirm</button>
        <button onClick={()=>{setAddForm(false)}}>cancel</button>
      </form>
    </>
  )
}
AddEmployee.propTypes={
  data:PropTypes.array,
  setData:PropTypes.func,
  setAddForm:PropTypes.func
}

export default AddEmployee
