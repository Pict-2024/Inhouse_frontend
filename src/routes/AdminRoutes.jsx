import Admin from "../Layouts/Admin";
import Dashboard from "../pages/Admin/Dashboard";

export const AdminRoutes =  {
    path: "a/",
    element:<Admin />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<Dashboard/>
        },
    ]
}