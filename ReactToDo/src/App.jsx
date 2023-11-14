import { useState } from "react"
import Todo from "./components/Todo"

function App() {
  // [{description:"asdfasfsadf",id:1,isCompleted:false,todoDate:"16 Sep 2004"},{description:"asdfasfsadf",id:2,isCompleted:false,todoDate:"16 Sep 2004"},{description:"asdfasfsadf",id:3,isCompleted:false,todoDate:"16 Sep 2004"}]
  let [mainData,setMainData] = useState([])
  let [data,setData] = useState([])
  return (
    <>
      <Todo data={data} setData={setData} mainData={mainData} setMainData={setMainData} />
    </>
  )
}

export default App
