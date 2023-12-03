import { Outlet } from "react-router-dom" 
import UserHeader from "./UserHeader"
function UserLayout() {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  )
}

export default UserLayout