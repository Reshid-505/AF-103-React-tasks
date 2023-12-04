import { useFormik } from "formik"
import { Input, Button } from 'antd';
import { addProductSchema } from "../validation/addProductSchema";
import { editProducts, getByIdProducts } from "../services/api/productRequests";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminEditProduct() {
  let {id} = useParams()
  let user= useSelector(state=>state.user.user)
  let [data,setData] = useState({})
  let navigate=useNavigate()
  useEffect(()=>{
      if(!user.isAdmin){
          navigate("/admin")
        }
    },[user])
    // let dispatch = useDispatch()
    let formik = useFormik({
        initialValues:{
            name:data?.name,
            price:data?.password
        },
        onSubmit: (values,actions) => {
            editProducts(id,values)
            .then(()=>{
                    navigate("/admin")
            })
            actions.resetForm()
        },
          validationSchema: addProductSchema,
    })
    useEffect(()=>{
      getByIdProducts(id)
      .then(item=>{
          setData(item)
          formik.values.name=item.name
          formik.values.price=item.price
      })
    },[])
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <Input style={{width:"20%",margin:"5px 10px"}} name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} placeholder="name" /><br/>
        {formik.errors.name && formik.touched.name && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.name}</div> }<br/>
        <Input style={{width:"20%",margin:"5px 10px"}} name="price" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.price} placeholder="price" type="number" /><br/>
        {formik.errors.price && formik.touched.price && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.price}</div> }<br/>
        <Button style={{margin:"5px 10px"}} htmlType="submit" type="primary">Add</Button>
    </form>
    </>
  )
}

export default AdminEditProduct
