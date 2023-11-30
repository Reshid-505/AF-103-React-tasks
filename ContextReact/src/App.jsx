import { useEffect, useState } from "react"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import BasketData from "./services/context/basketContext"
import "./reset.css"
import { ROUTES } from "./routes/index.jsx"

const routes = createBrowserRouter(ROUTES)
function App() {
  const [basket,setBasket] = useState([])
  useEffect(()=>{
    if(localStorage.getItem("basket")){
      setBasket(JSON.parse(localStorage.getItem("basket")))
    }else{
      localStorage.setItem("basket",JSON.stringify(basket))
    }
  },[])
  let datas={
    basket,
    setBasket
  }

  return (
    <BasketData.Provider value={datas}>
      <RouterProvider router={routes} />
    </BasketData.Provider>
  )
}

export default App
