import axios from 'axios';
import { BASE_URL } from './BASE_URL';

export async function getAll(){
    let result;
    await axios(BASE_URL+"/Users")
    .then(res=>{
        result=res.data
    })
    return result
}
export async function getById(id){
    let result;
    await axios(BASE_URL+"/Users/"+id)
    .then(res=>{
        result=res.data
    })
    return result
}
export async function addUser(data){
    await axios.post(BASE_URL+"/Users",data)
}
export async function deleteUser(id){
    await axios.delete(BASE_URL+"/Users/"+id)
}
export async function editUser(id,data){
    await axios.put(BASE_URL+"/Users/"+id,data)
}