import { BASE_URL } from "../BASE_URL";
import axios from "axios";

export async function getAll(){
    let categries;
    await axios(BASE_URL+"/categories")
    .then(res=>{
        categries=res.data
    })
    return categries
}
export async function getById(id){
    let categry;
    await axios(BASE_URL+"/categories/"+id)
    .then(res=>{
        categry=res.data
    })
    return categry
}
export async function addCategory(data){
    let addedCategry;
    await axios.post(BASE_URL+"/categories",data)
    .then(res=>{
        addedCategry=res.data
    })
    return addedCategry
}