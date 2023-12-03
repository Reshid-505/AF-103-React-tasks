import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { getAll } from '../services/api/usersRequests';
import { setUser } from '../services/redux/slices/userSlice';
function Login(){
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  useEffect(()=>{
      if(JSON.stringify(user)!="{}"){
          navigate("/")
      }
  },[user])
    const onFinish = (values) => {
      getAll()
      .then(data=>{
        let count=0
        data.forEach(item=>{
          if(item.name==values.username && item.password==values.password){
            dispatch(setUser(item))
            navigate("/")
          }else{
            count++
          }
        })
        if(data.length==count){
          alert("name or password wrong")
        }
      })
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
return(
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      marginTop:20,
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)}

export default Login;