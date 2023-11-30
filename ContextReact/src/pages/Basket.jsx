import { Table,Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import BasketData from '../services/context/basketContext';
import { getById } from '../services/api/categoriesRequest';
function Basket() {
  let {basket,setBasket} = useContext(BasketData)
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
            elem.quantity++
            setBasket([...basket])
            localStorage.setItem("basket",JSON.stringify(basket))
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
            elem.quantity--
            setBasket([...basket])
            localStorage.setItem("basket",JSON.stringify(basket))
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
            setBasket([...basket.filter(item=>item.data.id!=value)])
            localStorage.setItem("basket",JSON.stringify(basket))
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
