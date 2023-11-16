import PropTypes from "prop-types"
function Products({children,user}) {
  return (
    <>
    <table border="1" cellSpacing="0" cellPadding="5">
        <thead>
         <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>discount percentage</th>
            {user.isAdmin?(
              <>
                <th>edit</th>
                <th>delete</th>
              </>
            ):null}
         </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
      
    </>
  )
}
Products.propTypes={
    children:PropTypes.array,
    user:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),

}

export default Products
