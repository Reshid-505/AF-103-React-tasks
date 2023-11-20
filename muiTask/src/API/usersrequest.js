import axios from "axios";
let BASE_URL = "https://65565fe884b36e3a431faa36.mockapi.io"

export async function getAllUsers(){
    let result;
    await axios.get(BASE_URL+"/users")
    .then(data=>{result = data.data})
    return result
}
export function AddUser(data){
    axios.post(BASE_URL+"/users",{...data})
}
export function EditUser(id,data){
    axios.put(BASE_URL+"/users/"+id,{...data})
}