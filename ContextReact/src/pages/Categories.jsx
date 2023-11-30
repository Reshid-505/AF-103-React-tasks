import { useContext, useEffect, useState } from "react"
import { getAllCategories } from "../services/api/categoriesRequest"
import { Table,Button } from 'antd';
import BasketData from "../services/context/basketContext";
import toast, { Toaster } from 'react-hot-toast';
function Categories() {
  let {basket,setBasket}=useContext(BasketData)
  const[data,setData]=useState([])
  useEffect(()=>{
    getAllCategories()
    .then(datas=>setData(datas))
  },[])
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
      title: 'Basket',
      dataIndex: 'basket',
      render: (value) => {
        return (<Button onClick={()=>{
          toast.success('Successfully added!')
          let elem=basket.find(item=>item.data.id==value.id)
          if(!elem){
            basket.push({data:value,quantity:1})
            setBasket([...basket])
            localStorage.setItem("basket",JSON.stringify(basket))
          }else{
            elem.quantity++
            setBasket([...basket])
            localStorage.setItem("basket",JSON.stringify(basket))
          }
        }} type="primary">Basket</Button>);
    }
    },
  ];
  let tableData=data?.map((item,idx)=>{return({key: idx,id: item.id,name: item.name,basket:item})})
  return (
    <>
      <div><Toaster/></div>
      <Table columns={columns} dataSource={tableData} />
    </>
  )
}

export default Categories
