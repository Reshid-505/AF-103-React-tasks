import { Table,Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { decBasketElem, deleteBasketElem, incBasketElem } from '../services/redux/slices/basketSlice';

function Basket() {
  let basket = useSelector((state)=>state.basket.basket) 
  let user = useSelector((state)=>state.user.user) 
  let navigate = useNavigate()
  useEffect(()=>{
    if(JSON.stringify(user)=="{}"){
        navigate("/")
    }
},[user])

  let dispatch = useDispatch()
  const columns = [
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
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Increase',
      dataIndex: 'increase',
      render: (value) => {
        return (<Button onClick={()=>{
          let elem=basket.find(item=>item.data.id==value)
          if(elem){
            dispatch(incBasketElem(value))
          }
        }} type="primary">+</Button>);
    }
    },
    {
      title: 'Decrease',
      dataIndex: 'decrease',
      render: (value) => {
        return (<Button onClick={()=>{
          let elem=basket.find(item=>item.data.id==value)
          if(elem && elem.quantity>1){
            dispatch(decBasketElem(value))
          }
        }} type="primary" danger>-</Button>);
    }
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (value) => {
        return (<Button onClick={()=>{
          let elem=basket.find(item=>item.data.id==value)
          if(elem){
            dispatch(deleteBasketElem(value))
            
          }
        }} type="primary" danger>Delete</Button>);
    }
    },
  ];
  let [tableData,setTableData]=useState([])
  // let [tableData,setTableData]=useState([])
  
  useEffect(()=>{
    setTableData(basket.map((elem,idx)=>{
        let item = elem.data
        return{key: idx,id: item.id,name: item.name,quantity:elem.quantity,increase:item.id,decrease:item.id,delete:item.id}
    }))
  },[basket])
  return (
    <>
     <Table columns={columns} dataSource={tableData} /> 
    </>
  )
}

export default Basket
