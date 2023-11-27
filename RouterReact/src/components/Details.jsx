import { useState } from "react"
import { useParams } from "react-router-dom"
import { getById } from "../services/api/categoryRequests"

function Details() {
    let{id} = useParams()
    let [category,setCategory]=useState({})
    getById(id)
    .then(data=>setCategory(data))
  return (
    <>
      <h1>Name:{category.name}</h1>
      <h2>description:{category.description}</h2>
    </>
  )
}

export default Details
