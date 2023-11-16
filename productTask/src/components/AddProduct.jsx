import PropTypes from "prop-types"
import { useState } from "react"
import { addProd } from "../api/productrequest"

function AddProduct({setData,setAddForm}) {
  let [name,setName]=useState("")
  let [price,setPrice]=useState("")
  let [discountPercentage,setDiscountPercentage]=useState("")
  function handleAdd(e){
      let date = new Date();
      e.preventDefault()
      if(name.length>3){
        let newData = {name,price:Number(price),discountPercentage:Number(discountPercentage),createdAt:date.getTime()}
        addProd(newData)
        .then(datas=>setData(datas))
        setAddForm(false)
      }
    }
return (
  <>
  <form onSubmit={(e)=>{handleAdd(e)}}>
      <input onChange={(e)=>{setName(e.target.value)}} type="text" value={name} placeholder="name" />
      <input onChange={(e)=>{setPrice(e.target.value)}} type="number" value={price} placeholder="price" />
      <input onChange={(e)=>{setDiscountPercentage(e.target.value)}} type="number" value={discountPercentage} placeholder="discount percentage" />
      <button type="submit">confirm</button>
      <button onClick={()=>{setAddForm(false)}}>cancel</button>
  </form>
    
  </>
  )
}

AddProduct.propTypes={
  setData:PropTypes.func,
  setAddForm:PropTypes.func
}
export default AddProduct
