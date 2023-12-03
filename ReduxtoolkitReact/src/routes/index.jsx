import UserLayout from "../pages/UserLayout";
import Basket from "../pages/Basket";
import Login from "../pages/Login";
import Products from "../pages/Products";
import User from "../pages/User";
import Details from "../pages/Details";
import Register from "../pages/Register";
import AdminLayout from "../pages/AdminLayout";
import AdminLogin from "../pages/AdminLogin";
import AdminProducts from "../pages/AdminProducts";
import AdminAddProduct from "../pages/AdminAddProduct";

export const ROUTES =[
    {
        path:"/",
        element: <UserLayout />,
        children:[
            {
                path:"/login",
                element: <Login />,
            },
            {
                path:"/register",
                element: <Register />,
            },
            {
                index:true,
                element: <Products />,
            },
            {
                path:"/user",
                element: <User />,
            },
            {
                path:"/basket",
                element: <Basket />,
            },
            {
                path:"/detail/:id",
                element: <Details />,
            }
        ]
        
    },{
        path:"/admin",
        element:<AdminLayout />,
        children:[
            {
                index:true,
                element: <AdminProducts />,
            },
            {
                path:"login",
                element: <AdminLogin />,
            },
            {
                path:"add",
                element: <AdminAddProduct />,
            },
            {
                path:"detail/:id",
                element: <Details />,
            }
        ]

    }
]