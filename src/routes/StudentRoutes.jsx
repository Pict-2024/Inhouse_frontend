import Student from "../Layouts/Student";
import { SDashboard } from "../pages/Student/SDashboard";


export const StudentRoutes =  {
    path: "s/",
    element:<Student />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<SDashboard/>
        },
    ]
}