import Student from "../Layouts/Student";
import Achievements from "../pages/Student/Achievements";
import CoCurricular from "../pages/Student/CoCurricular";
import InternShip from "../pages/Student/InternShip";
import { SDashboard } from '../pages/Student/SDashboard';


export const StudentRoutes =  {
    path: "s/",
    element:<Student />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'dashboard',
            element:<SDashboard/>
        },
        {
            path:'internship',
            element:<InternShip/>
        },
        {
            path:'achievements',
            element:<Achievements/>
        },
        {
            path:'co-curricular',
            element:<CoCurricular/>
        },
    ]
}