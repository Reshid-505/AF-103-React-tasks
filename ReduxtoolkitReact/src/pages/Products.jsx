import { Table,Button } from 'antd';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api/productRequests';
import { useDispatch, useSelector } from "react-redux"
import { addBasket, incBasketElem } from '../services/redux/slices/basketSlice';
import { useNavigate } from "react-router-dom";

function Products() {
  let [mainData,setMainData] = useState([])
  let basket = useSelector((state)=>state.basket.basket)
  const user = useSelector(state=>state.user.user)
  let navigate =useNavigate()
  let dispatch = useDispatch()
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
      title: 'Basket',
      dataIndex: 'basket',
      render: (value) => {
        return (<Button onClick={()=>{
          let elem=basket.find(item=>item.data.id==value.id)
          if(!elem){
            dispatch(addBasket({data:value,quantity:1}))
          }else{
            dispatch(incBasketElem(value.id))
          }
        }} type="primary">Basket</Button>);
    }
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      render: (value) => {
        return (<Button onClick={()=>{
          navigate(`/detail/${value}`)
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
          navigate(`/detail/${value}`)
        }} type="primary">Detail</Button>);
      }
    },
  ];
  useEffect(()=>{
    getAllProducts()
    .then(data=>setMainData(data))
  },[])

  let tableData=mainData?.map((item,idx)=>{return({key: idx,id: item.id,name: item.name,price:item.price,basket:item,detail:item.id})})
  return (
    <>
      <Table columns={columns} dataSource={tableData} />
    </>
  )
}

export default Products
