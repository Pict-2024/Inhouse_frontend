import Teacher from "../Layouts/Teacher";
import { HomePage } from "../pages/Teacher/HomePage";



export const TeacherRoutes =  {
    path: "t/",
    element:<Teacher />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<HomePage/>
        },
    ]
}