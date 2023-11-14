import PropTypes from "prop-types"
function Todoitem({item,data,setData,mainData,setMainData}) {
  function handleDelete(){
    setData([...data.filter(i=>i.id!=item.id)])
    setMainData([...mainData.filter(i=>i.id!=item.id)])
  }
  function handleComplete(e){
    let elem = data.find(i=>i.id==item.id)
    let mainElem = mainData.find(i=>i.id==item.id)
    if(e.target.checked){
      elem.isCompleted=true;
      mainElem.isCompleted=true;
      setData([...data])
      setMainData([...mainData])
    }else{
      elem.isCompleted=false;
      mainElem.isCompleted=false;
      setData([...data])
      setMainData([...mainData])
    }
    console.log(mainData)
  }
  return (
    <li>
        {item.description} <button onClick={()=>{handleDelete()}}>delete</button> <input onChange={(e)=>{handleComplete(e)}} type="checkbox" checked={item.isCompleted?"checked":false} />
    </li>
  )
}
Todoitem.propTypes={
  item:PropTypes.object,
  data:PropTypes.array,
  setData:PropTypes.func,
  mainData:PropTypes.array,
  setMainData:PropTypes.func

}

export default Todoitem
