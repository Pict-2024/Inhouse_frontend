import Teacher from "../Layouts/Teacher";
import { TDashBoard } from './../pages/Teacher/TDashBoard';

export const TeacherRoutes =  {
    path: "t/",
    element:<Teacher />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<TDashBoard/>
        },
    ]
}