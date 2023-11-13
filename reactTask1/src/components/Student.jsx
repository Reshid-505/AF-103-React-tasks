import students from "../students"

function Student() {
  return (
    <>
        <h2>This is Student</h2>
        <ul>
            {students.map(item=>{return <li key={item.id}>{item.name}</li>})}
        </ul>
      
    </>
  )
}

export default Student
