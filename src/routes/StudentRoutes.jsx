import Student from "../Layouts/Student";
import { HomePage } from "../pages/Student/HomePage";


export const StudentRoutes =  {
    path: "s/",
    element:<Student />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<HomePage/>
        },
    ]
}