import PropTypes from "prop-types"
import moment from "moment"
function EmployeesTableRow({item,index,data,setData,editForm,setEditForm}) {
  function handleFire(){
    //togle isfire
    item.isFire=!item.isFire
    //activate once isFire
    // item.isFire=true
    setData([...data])
  }
  function handleDelete(){
    let conf = confirm("Are you sure")
    if(conf){
      if(editForm==item.id){
        setEditForm("")
      }
        setData([...data.filter(elem=>elem.id!=item.id)])
    }
  }
  function handleEdit(){
    if(!editForm){
        setEditForm(item.id)
    }
    
  }
  return (
    <tr style={item.isFire?{color:"red"}:null}>
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.salary}</td>
      <td>{moment(item.createdAt).format("Do MMM YYYY")}</td>
      <td><button onClick={handleFire}>fire</button></td>
      <td><button onClick={handleEdit}>edit</button></td>
      <td><button onClick={handleDelete}>delete</button></td>
    </tr>
  )
}
EmployeesTableRow.propTypes={
    item:PropTypes.object,
    index:PropTypes.number,
    data:PropTypes.array,
    editForm:PropTypes.string,
    setData:PropTypes.func,
    setEditForm:PropTypes.func,
}
export default EmployeesTableRow
