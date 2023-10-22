import Teacher from "../Layouts/Teacher";
import { TDashboard } from "../pages/Teacher/TDashboard";



export const TeacherRoutes =  {
    path: "t/",
    element:<Teacher />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<TDashboard/>
        },
    ]
}