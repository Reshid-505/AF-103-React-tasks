import { useFormik } from "formik"
import { Input, Button, Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { editUser, getById } from "../services/api/usersRequests";
import { addUserSchema } from "../validation/addUserSchema";
import { useParams } from "react-router-dom";

function AdminEditUser() {
  let {id} = useParams()
  console.log(id)
  let user= useSelector(state=>state.user.user)
  let navigate=useNavigate()
  useEffect(()=>{
    if(!user.isAdmin){
      navigate("/admin")
    }
  },[user])
  let [data,setData] = useState({})
    let formik = useFormik({
        initialValues:{
            name:data?.name,
            password:data?.password,
            isAdmin:data?.isAdmin
        },
        onSubmit: (values,actions) => {
            editUser(id,values)
            .then(()=>{navigate("/admin/users")})
            actions.resetForm()
          },
          validationSchema: addUserSchema,
    })
    useEffect(()=>{
      getById(id)
      .then(item=>{
        setData(item)
          formik.values.name=item.name
          formik.values.password=item.password
          formik.values.isAdmin=item.isAdmin
          console.log(item.isAdmin)
      })
    },[])
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <Input style={{width:"20%",margin:"5px 10px"}} name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} placeholder="name" /><br/>
        {formik.errors.name && formik.touched.name && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.name}</div> }<br/>
        <Input style={{width:"20%",margin:"5px 10px"}} name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder="password" type="password" /><br/>
        {formik.errors.password && formik.touched.password && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.password}</div> }<br/>
        <Checkbox style={{margin:"5px 10px"}} name="isAdmin" checked={formik.values.isAdmin?"checked":false} onChange={formik.handleChange}>Admin</Checkbox><br />
        <Button style={{margin:"5px 10px"}} htmlType="submit" type="primary">Add</Button>
    </form>
    </>
  )
}

export default AdminEditUser
