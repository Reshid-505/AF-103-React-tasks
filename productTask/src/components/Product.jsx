import PropTypes from "prop-types"
import { deleteProd } from "../api/productrequest"
function Product({item,user,data,setData,setEditForm,editForm}) {
  function handleDelete(){
    setData([...data.filter(elem=>elem.id!=item.id)])
    deleteProd(item.id)
  }
  function handleEdit(){
    if(!editForm){
      setEditForm(item.id)
    }
  }
  return (
    <>
      <tr>
        <td>{item?.id}</td>
        <td>{item?.name}</td>
        <td>{item?.price}</td>
        <td>{String(item?.discountPercentage)}</td>
        {user.isAdmin?(
                <>
                  <td><button onClick={handleEdit}>edit</button></td>
                  <td><button onClick={()=>{handleDelete()}}>delete</button></td>
                </>
        ):null}
      </tr>
    </>
  )
}
Product.propTypes={
  item:PropTypes.object,
  user:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
  editForm:PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
  data:PropTypes.array,
  setEditForm:PropTypes.func,
  setData:PropTypes.func
}
export default Product
