import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { deleteUser, getAll } from '../services/api/usersRequests';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
function AdminUsers() {
    let user= useSelector(state=>state.user.user)
    let navigate=useNavigate()
    useEffect(()=>{
      if(!user.isAdmin){
        navigate("/admin")
      }
    },[user])
    let [users,setUsers] = useState([])
    const columns=[
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Password',
            dataIndex: 'password',
        },
        {
            title: 'Admin',
            dataIndex: 'admin',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (value) => {
                return (<Button onClick={()=>{
                deleteUser(value)
                setUsers([...users.filter(x=>x.id!=value)])
                }} type="primary">Delete</Button>);
            }
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (value) => {
              return (<Button onClick={()=>{
                navigate(`/admin/edituser/${value}`)
              }} type="primary">Edit</Button>);
          }
          },
    ]
    let tableData;
    useEffect(()=>{
        getAll()
        .then(data=>setUsers(data))
    },[])
    tableData=users?.map((item)=>{return({id: item.id,name: item.name,password:item.password,admin:JSON.stringify(item.isAdmin),delete:item.id,edit:item.id})})
  return (
    <>
        {<Button onClick={()=>{navigate("/admin/useradd")}}>Add</Button>}
        <Table columns={columns} dataSource={tableData} />
    </>
  )
}

export default AdminUsers
