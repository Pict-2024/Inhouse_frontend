import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Auth from "./../Layouts/Auth";

export const AuthRoutes = {
  path: "auth/",
  element: <Auth />,
  // errorElement: <ErrorPage/>,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};
