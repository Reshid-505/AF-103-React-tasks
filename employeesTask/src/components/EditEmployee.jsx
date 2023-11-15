import PropTypes from "prop-types"
import { useState } from "react"
function EditEmployee({editForm,setEditForm,data,setData}) {
  let itemFind=data.find(item=>item.id===editForm)
  let [editName,setEditName]=useState(itemFind.name)
  let [editAge,setEditAge]=useState(itemFind.age)
  let [editSalary,setEditSalary]=useState(itemFind.salary)
  function handleEdit(e){
    e.preventDefault()
    if(editName.length>3){
      let date= new Date()
      itemFind.name=editName
      itemFind.age=Number(editAge)
      itemFind.salary=Number(editSalary)
      itemFind.updatedAt=date.getTime()
      setData([...data])
      setEditForm("")
    }
  }
  return (
    <>
      <form onSubmit={(e)=>{handleEdit(e)}}>
        <input onChange={(e)=>{setEditName(e.target.value)}} type="text" value={editName} placeholder="name" />
        <input onChange={(e)=>{setEditAge(e.target.value)}} type="number" value={editAge} placeholder="age" />
        <input onChange={(e)=>{setEditSalary(e.target.value)}} type="number" value={editSalary} placeholder="salary" />
        <button type="submit">confirm edit</button>
        <button onClick={()=>{}}>cancel</button>
      </form>
    </>
  )
}
EditEmployee.propTypes={
  data:PropTypes.array,
  setData:PropTypes.func,
  setEditForm:PropTypes.func,
  editForm:PropTypes.string
}

export default EditEmployee
