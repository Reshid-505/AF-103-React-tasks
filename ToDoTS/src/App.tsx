import { useState } from "react"
import React from 'react';
import { Input, Button, Checkbox } from 'antd';
import "./reset.css"
import { nanoid } from "nanoid";

const App: React.FC=()=>{
//types
type ID = string | number  
//interfaces
interface Todo{
  id: ID
  text: string,
  isMarked: boolean,
  edit: boolean
}
const [todo,setTodo] = useState<string>("")
const [todos,setTodos] = useState<Todo[]>([])

const addTodo=():void=>{
  if(todo.trim()){
    setTodos([...todos,{id:nanoid(),text:todo,isMarked:false,edit:false}])
    setTodo("")
  }
}

  return (
    <>
      <div style={{width:"500px",margin:"50px auto"}}>
        <div style={{display:"flex",gap:"5px"}}>
          <Input placeholder="Todo" value={todo} onChange={(e)=>{setTodo(e.target.value)}}/> 
          <Button type="primary" onClick={addTodo} >Add</Button>
        </div>
        <ul>
          {todos.map((item)=><li style={{display:"flex", alignItems:"center",gap:"10px"}} key={item.id}>{item.edit?<Input value={item.text} onChange={(e)=>{setTodos([...todos.filter((i)=>{i.id==item.id?i.text=e.target.value:null;return(i)})])}} />:<p style={{textDecoration:item.isMarked?"line-through":"none"}}>{item.text}</p>} <Checkbox onChange={(e)=>{setTodos([...todos.filter((i)=>{i.id==item.id?i.isMarked=e.target.checked:null;return(i)})])}} />  <Button type="primary" onClick={()=>{setTodos([...todos.filter((i)=>i.id!=item.id)])}} danger>delete</Button><Button type="primary" onClick={()=>{setTodos([...todos.filter((i)=>{item.text?i.id==item.id?i.edit=!i.edit:null:null;return(i)})])}} >edit</Button></li>)}
        </ul>
      </div>
      
    </>
  )
}

export default App
