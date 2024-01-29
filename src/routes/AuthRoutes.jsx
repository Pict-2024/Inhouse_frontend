import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPass from "../pages/Auth/ResetPass";
import ForgotPass from "../pages/Auth/forgotPass";
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
    {
      path: "forgot-password",
      element: <ForgotPass />,
    },
    {
      path: "reset-password",
      element: <ResetPass />,
    },
  ],
};
