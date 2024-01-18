import Admin from "../Layouts/Admin";
import Report from "../pages/Admin/Report";
import Students from "../pages/Admin/Students";

import Teachers from "../pages/Admin/Teachers";
import UserData from "../pages/Admin/UserData";
import { ADashBoard } from './../pages/Admin/ADashboard';


export const AdminRoutes =  {
    path: "a/",
    element:<Admin />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<ADashBoard/>
        },
        {
            path:'teachers',
            element:<Teachers/>
        },
        {
            path:'students',
            element:<Students/>
        },
        {
            path:'report',
            element:<Report/>
        },
        {
            path:'userData',
            element:<UserData/>
        },
        
    ]
}