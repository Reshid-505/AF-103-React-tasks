import AppLayout from "../pages/AppLayout";
import Basket from "../pages/Basket";
import Categories from "../pages/Categories";

export const ROUTES =[
    {
        path:"/",
        element: <AppLayout />,
        children:[
            {
                index:true,
                element: <Categories />,
            },
            {
                path:"/basket",
                element: <Basket />,
            }
        ]
        
    }
]