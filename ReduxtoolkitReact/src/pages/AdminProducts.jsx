import { Table,Button } from 'antd';
import { useEffect } from 'react';
import { deleteProducts, getAllProducts } from '../services/api/productRequests';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { setdata } from '../services/redux/slices/dataSlice';


function AdminProducts() {
  let dispatch = useDispatch()
  const data = useSelector(state=>state.data.data)
  const user = useSelector(state=>state.user.user)
  let navigate =useNavigate()
  const columns = (JSON.stringify(user)!="{}")?[
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
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (value) => {
        return (<Button onClick={()=>{
            deleteProducts(value)
            dispatch(setdata([...data.filter(item=>item.id!=value)]))
        }} type="primary">Delete</Button>);
    }
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: (value) => {
        return (<Button onClick={()=>{
          navigate(`/admin/editproduct/${value}`)
        }} type="primary">Edit</Button>);
    }
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      render: (value) => {
        return (<Button onClick={()=>{
          navigate(`detail/${value}`)
        }} type="primary">Detail</Button>);
      }
    },
  ]:[
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
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      render: (value) => {
        return (<Button onClick={()=>{
          navigate(`detail/${value}`)
        }} type="primary">Detail</Button>);
      }
    },
  ];
  useEffect(()=>{
    getAllProducts()
    .then(data=>dispatch(setdata(data)))
  },[])

  let tableData=data?.map((item,idx)=>{return({key: idx,id: item.id,name: item.name,price:item.price,delete:item.id,edit:item.id,detail:item.id})})
  return (
    <>
      {user.isAdmin?<Button onClick={()=>{navigate("add")}}>Add</Button>:null}
      <Table columns={columns} dataSource={tableData} />
    </>
  )
}

export default AdminProducts
