import PropTypes from "prop-types"
import EmployeeTable from "./EmployeeTable"
import EmployeesTableRow from "./EmployeesTableRow"
import { useEffect, useState } from "react"
import AddEmployee from "./AddEmployee"
import EditEmployee from "./EditEmployee"
function Employees({data,setData,filteredData,setFilteredData}) {
    let [addForm,setAddForm]=useState(false)
    let [editForm,setEditForm]=useState("")
    let [search,setSearch]=useState("")
    let [avgSalary,setAvgSalary]=useState(0)
    useEffect(()=>{
        setSearch("")
        setFilteredData(data)
        handleAvarageSalary()
    },[data])
    function handleSearch(e){
        setSearch(e.target.value)
        setFilteredData([...data.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase().trim()))])
    }
    function handleFilterFired(){
        setFilteredData([...filteredData.filter(item=>item.isFire)])
    }
    function handleSortSalary(){
        setFilteredData([...filteredData.sort((a,b)=>a.salary-b.salary)])
    }
    function handleSortAge(){
        setFilteredData([...filteredData.sort((a,b)=>a.age-b.age)])
    }
    function handleAvarageSalary(){
        if(data.length>0){
            setAvgSalary(data.reduce((total,item)=>{return total+=item.salary},0)/data.length)
        }else{
            setAvgSalary(0)
        }
    }
  return (
    <>
    <div>
        <input onChange={(e)=>{handleSearch(e)}} type="text" value={search} placeholder="search"/>
        <button onClick={handleFilterFired}>filter Fired Employees</button>
        <button onClick={handleSortSalary}>sort by salary</button>
        <button onClick={handleSortAge}>sort by age</button>
        <button onClick={handleAvarageSalary}>calculate average salary</button>
    </div>
    <button onClick={()=>{setAddForm(true)}}>Add</button>
    <EmployeeTable>
        {data && filteredData.map((item,index)=><EmployeesTableRow key={item.id} item={item} data={data} setData={setData} index={index} editForm={editForm} setEditForm={setEditForm} />)}
    </EmployeeTable>
    {addForm?<AddEmployee setAddForm={setAddForm} data={data} setData={setData} />:null}
    {editForm? <EditEmployee editForm={editForm} setEditForm={setEditForm} data={data} setData={setData} />:null }  
    <div>Avarage Salary: {avgSalary}</div>
    </>
  )
}
Employees.propTypes={
    data:PropTypes.array,
    setData:PropTypes.func,
    filteredData:PropTypes.array,
    setFilteredData:PropTypes.func
}

export default Employees
