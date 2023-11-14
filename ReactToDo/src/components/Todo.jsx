import PropTypes from "prop-types"
import Addtodo from "./Addtodo"
import Todoitem from "./Todoitem"
import Todolist from "./Todolist"
function Todo({data,setData,mainData,setMainData}) {
    function handleSortDate(){
        setData([...data.sort((a,b)=>b.todoDate-a.todoDate)])
    }
    function handleSearch(e){
        setData(mainData.filter(item=>item.description.toLowerCase().includes(e.target.value.toLowerCase().trim())))  
    }
    function handleSortComplete(){
        setData(data.filter(item=>item.isCompleted))  
    }
    // console.log(data)
  return (
    <>
        <input onChange={(e)=>{handleSearch(e)}} type="text" />
        <button onClick={()=>{handleSortComplete()}}>Sort by Complete</button>
        <button onClick={()=>{handleSortDate()}}>Sort by date</button>
        <Addtodo data={data} setData={setData} mainData={mainData} setMainData={setMainData} />

        <Todolist>
            {data && data.map(item=>{return <Todoitem key={item.id} item={item} data={data} setData={setData} mainData={mainData} setMainData={setMainData}   />})}
        </Todolist>
    </>
  )
}
Todo.propTypes={
    data:PropTypes.array,
    setData:PropTypes.func,
    mainData:PropTypes.array,
    setMainData:PropTypes.func
}
export default Todo
