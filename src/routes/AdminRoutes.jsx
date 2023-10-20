import Admin from "../Layouts/Admin";
import ADashboard from "../pages/Admin/ADashboard";

export const AdminRoutes =  {
    path: "a/",
    element:<Admin />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<ADashboard/>
        },
    ]
}