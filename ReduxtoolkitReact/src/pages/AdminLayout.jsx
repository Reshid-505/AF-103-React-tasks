import { Outlet } from "react-router-dom" 
import AdminHeader from "./AdminHeader"
function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  )
}

export default AdminLayout