import PropTypes from "prop-types"

function User({user}) {
  return (
    <div>
      User: {user.name}
    </div>
  )
}
User.propTypes={
  user:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
}

export default User
