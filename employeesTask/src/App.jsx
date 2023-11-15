import { useState } from 'react'
import Employees from './components/Employees'

function App() {
  let [data,setData] = useState([])
  let [filteredData,setFilteredData] = useState([])

  return (
    <>
     <Employees data={data} setData={setData} filteredData={filteredData} setFilteredData={setFilteredData} />
    </>
  )
}

export default App
