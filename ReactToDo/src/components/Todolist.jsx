import PropTypes from "prop-types"
function Todolist({children}) {
  return (
    <ul>
        {children}
    </ul>
  )
}
Todolist.propTypes={
    children:PropTypes.array
}

export default Todolist
