import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { Input, Button } from 'antd';
import { registerSchema } from "../validation/registerSchema";
import { useEffect } from "react";
import { addUser } from "../services/api/usersRequests";

function Register() {
    const user = useSelector(state=>state.user.user)
    let navigate = useNavigate()
    useEffect(()=>{
        if(JSON.stringify(user)!="{}"){
            navigate("/")
        }
    },[user])
    const formik = useFormik({
        initialValues:{
          name:"",
          password:""
      },
      onSubmit: (values,actions) => {
        let data={...values,isAdmin:false}
        addUser(data)
        actions.resetForm()
        // console.log(JSON.stringify(values, null, 2));
        navigate("/login")
      },
      validationSchema: registerSchema,
      })
  return (
    <>
        <form onSubmit={formik.handleSubmit}>
            <Input style={{width:"20%",margin:"5px 10px"}} name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} placeholder="name" /><br/>
            {formik.errors.name && formik.touched.name && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.name}</div> }<br/>
            <Input style={{width:"20%",margin:"5px 10px"}} name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder="password" type="password" /><br/>
            {formik.errors.password && formik.touched.password && <div style={{color:"red",margin:"0 10px"}}>{formik.errors.password}</div> }<br/>
            <Button style={{margin:"5px 10px"}} htmlType="submit" type="primary">Register</Button>
        </form> 
    </>
  )
}

export default Register
