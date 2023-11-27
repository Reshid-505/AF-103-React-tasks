import { Outlet } from "react-router-dom"
import Header from "./UserHeader"
import UserFooter from "./UserFooter"

function User() {
  return (
    <>
        <Header />
        <Outlet />
        <UserFooter />
    </>
  )
}

export default User
