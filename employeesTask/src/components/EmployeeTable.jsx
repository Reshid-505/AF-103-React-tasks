import PropTypes from "prop-types"
function EmployeeTable({children}) {
  return (
    <>
      <table border="1" cellSpacing="0" cellPadding="5px">
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>age</th>
                <th>salary</th>
                <th>created date</th>
                <th>fire</th>
                <th>edit</th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
      </table>
    </>
  )
}
EmployeeTable.propTypes={
    children:PropTypes.array
}

export default EmployeeTable
