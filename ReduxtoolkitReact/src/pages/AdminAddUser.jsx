import { useFormik } from "formik"
import { Input, Button, Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { addUser } from "../services/api/usersRequests";
import { addUserSchema } from "../validation/addUserSchema";


function AdminAddUser() {
  let user= useSelector(state=>state.user.user)
  let navigate=useNavigate()
  useEffect(()=>{
    if(!user.isAdmin){
      navigate("/admin")
    }
  },[user])
    let formik = useFormik({
        initialValues:{
            name:"",
            password:"",
            isAdmin:false
        },
        onSubmit: (values,actions) => {
            addUser(values)
            .then(()=>{navigate("/admin/users")})
            actions.resetForm()
          },
          validationSchema: addUserSchema,
    })
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <Input style={{width:"20%",margin:"5px 10px"}} name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} placeholder="name" /><br/>
        {formik.errors.name && formik.touched.name && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.name}</div> }<br/>
        <Input style={{width:"20%",margin:"5px 10px"}} name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder="password" type="password" /><br/>
        {formik.errors.password && formik.touched.password && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.password}</div> }<br/>
        <Checkbox style={{margin:"5px 10px"}} name="isAdmin" value={formik.values.isAdmin} onChange={formik.handleChange}>Admin</Checkbox><br />
        <Button style={{margin:"5px 10px"}} htmlType="submit" type="primary">Add</Button>
    </form>
    </>
  )
}

export default AdminAddUser
