import { useState } from 'react'
import { useEffect } from 'react'
import Products from './components/Products'
import Product from './components/Product'
import User from './components/User'
import { getAllProd } from './api/productrequest'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
function App() {
  let [data,setData] = useState([])
  let [filteredData,setFilteredData] = useState([])
  let [user,setUser] = useState(false)
  let [loginForm,setLoginForm] = useState(false)
  let [registerForm,setRegisterForm] = useState(false)
  let [addForm,setAddForm] = useState(false)
  let [editForm,setEditForm] = useState(false)
  useEffect(()=>{    
    getAllProd()
    .then(datas=>setData(datas))
  },[])
  useEffect(()=>{
    setFilteredData(data)
  },[data])
  return (
    <>
      {!user?
      (<>
        <button onClick={()=>{setLoginForm(true);setRegisterForm(false)}}>Login</button>
        <button onClick={()=>{setRegisterForm(true);setLoginForm(false)}}>Register</button>
      </>):
      (<>
        <User user={user} />
        <Logout setUser={setUser}/>
        <div>
          <input onChange={(e)=>{setFilteredData([...data.filter((item=>item.name.toLowerCase().includes(e.target.value.toLowerCase().trim())))])}} type="text" placeholder='search' />
          <button onClick={()=>{setFilteredData([...[...data].sort((a,b)=>a.price-b.price)])}}>low to high</button>
          <button onClick={()=>{setFilteredData([...[...data].sort((a,b)=>b.price-a.price)])}}>high to low</button>
        </div>
      </>)}
      {user.isAdmin?(<button onClick={()=>{setAddForm(true)}} >Add</button>):null}
      {addForm?<AddProduct data={data} setData={setData} setAddForm={setAddForm} />:null}
      {editForm?<EditProduct data={data} setData={setData} editForm={editForm} setEditForm={setEditForm} />:null}
      {loginForm?<Login user={user} setUser={setUser} setLoginForm={setLoginForm} />:null}
      {registerForm?<Register setRegisterForm={setRegisterForm} />:null}
      {user?(
      <Products user={user}>
        {filteredData.map(item=><Product key={item.id} user={user} data={data} setData={setData} editForm={editForm} setEditForm={setEditForm} item={item} />)}
      </Products>):null}

    </>
  )
}

export default App
