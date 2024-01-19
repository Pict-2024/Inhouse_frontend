import Admin from "../Layouts/Admin";
import Report from "../pages/Admin/Report";
import StudentData from "../pages/Admin/StudentData";
import Students from "../pages/Admin/Students";
import TeacherData from "../pages/Admin/TeacherData";

import Teachers from "../pages/Admin/Teachers";
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
            path:'teacherData',
            element:<TeacherData/>
        },
        {
            path:'studentData',
            element:<StudentData/>
        },
        
        
        
    ]
}