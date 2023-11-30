import axios from "axios";
import { BASE_URL } from "./baseUrl";

export async function getAllCategories(){
    let result;
    await axios(BASE_URL)
    .then(res=>result=res.data)
    return result;
}
export async function getById(id){
    let result;
    await axios(BASE_URL+"/"+id)
    .then(res=>result=res.data)
    return result;
}