import { Route, Routes } from "react-router-dom"
import User from "./components/User"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Admin from "./components/Admin"
import Categories from "./components/Categories"
import Add from "./components/Add"
import Dashboard from "./components/Dashboard"
import Details from "./components/Details"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<User />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<Admin />} >
          <Route index element={<Dashboard />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="add" element={<Add />} />
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<h1 style={{ fontSize: "5em", fontWeight: "bold", textAlign: "center", margin: "100px 0", }}> Error 404!</h1>} />
      </Routes>
    </>
  )
}

export default App
