import axios from "axios";
let BASE_URL = "https://65565fe884b36e3a431faa36.mockapi.io"

export async function getAllProd(){
    let result;
    await axios.get(BASE_URL+"/products")
    .then(data=>{result = data.data})
    return result
}

export function deleteProd(id){
    axios.delete(BASE_URL+"/products/"+id)
}
export async function addProd(data){
    let result;
    await axios.post(BASE_URL+"/products",data)
    await axios.get(BASE_URL+"/products")
    .then(data=>{result = data.data})
    return result
}
export function editProd(id,data){
    axios.put(BASE_URL+"/products/"+id,{...data})
}