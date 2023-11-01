import Login from '../pages/Auth/login';
import Auth from './../Layouts/Auth';

export const AuthRoutes =  {
    path: "auth/",
    element:<Auth />,
    // errorElement: <ErrorPage/>,
    children:[
        {
            path:'login',
            element:<Login/>
        },
    ]
}