import PropTypes from "prop-types"
function Cards({children}) {
  return (
    <>
      {children} 
    </>
  )
}
Cards.propTypes={
  children:PropTypes.object
}

export default Cards
