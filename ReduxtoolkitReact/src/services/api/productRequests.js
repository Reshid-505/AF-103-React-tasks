import axios from 'axios';
import { BASE_URL } from './BASE_URL';

export async function getAllProducts(){
    let result;
    await axios(BASE_URL+"/products")
    .then(res=>{
        result=res.data
    })
    return result
}
export async function getByIdProducts(id){
    let result;
    await axios(BASE_URL+"/products/"+id)
    .then(res=>{
        result=res.data
    })
    return result
}
export async function deleteProducts(id){
    await axios.delete(BASE_URL+"/products/"+id)
}
export async function addProducts(data){
    await axios.post(BASE_URL+"/products",data)
}