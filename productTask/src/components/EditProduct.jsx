import PropTypes from "prop-types"
import { useState } from "react"
import { editProd } from "../api/productrequest"

function EditProduct({data,setData,editForm,setEditForm}) {
  let itemFind=data.find(item=>item.id===editForm)
  let [editName,setEditName]=useState(itemFind.name)
  let [editPrice,seteditPrice]=useState(itemFind.price)
  let [editDiscountPercentage,setEditDiscountPercentage]=useState(itemFind.discountPercentage)
  function handleEdit(e){
    e.preventDefault()
    if(editName.length>3){
      itemFind.name=editName
      itemFind.price=Number(editPrice)
      itemFind.discountPercentage=Number(editDiscountPercentage)
      let editedData={name:editName,price:Number(editPrice),discountPercentage:Number(editDiscountPercentage),createdAt:itemFind.createdAt}
      editProd(editForm,editedData)
      setData([...data])
      setEditForm(false)
    }
  }
  return (
    <>
      <form onSubmit={(e)=>{handleEdit(e)}}>
        <input onChange={(e)=>{setEditName(e.target.value)}} type="text" value={editName} placeholder="name" />
        <input onChange={(e)=>{seteditPrice(e.target.value)}} type="number" value={editPrice} placeholder="price" />
        <input onChange={(e)=>{setEditDiscountPercentage(e.target.value)}} type="number" value={editDiscountPercentage} placeholder="discount percentage" />
        <button type="submit">confirm</button>
        <button onClick={()=>{setEditForm(false)}}>cancel</button>
      </form>
    </>
  )
}
EditProduct.propTypes={
  data:PropTypes.array,
  setData:PropTypes.func,
  editForm:PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
  setEditForm:PropTypes.func
}
export default EditProduct
