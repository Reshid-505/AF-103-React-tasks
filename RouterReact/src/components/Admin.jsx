import { Outlet } from "react-router-dom"
import Header from "./AdminHeader"
import AdminFooter from "./AdminFooter"
function Admin() {
  return (
    <>
      <Header />
      <Outlet />
      <AdminFooter />
    </>
  )
}

export default Admin
