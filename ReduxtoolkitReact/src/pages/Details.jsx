import { useParams } from "react-router-dom";
import { getByIdProducts } from "../services/api/productRequests";
import { useEffect, useState } from "react";
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { addBasket, incBasketElem } from '../services/redux/slices/basketSlice';

function Details() {
    let [data,setData] = useState({})
    let {id} = useParams()
    let basket = useSelector((state)=>state.basket.basket)
    const user = useSelector(state=>state.user.user)
    let dispatch = useDispatch()
    useEffect(()=>{
        getByIdProducts(id)
        .then(res=>setData(res))
    },[])
    return (
        <>
            <h1>Name:{data.name}</h1>
            <h2>price:{data.price}$</h2>
            {(JSON.stringify(user)!="{}")?
                <Button onClick={()=>{
                let elem=basket.find(item=>item.data.id==data.id)
                if(!elem){
                    dispatch(addBasket({data:data,quantity:1}))
                }else{
                    dispatch(incBasketElem(data.id))
                }
                }} type="primary">Basket</Button>
            :null}
        </>
    )
}

export default Details
