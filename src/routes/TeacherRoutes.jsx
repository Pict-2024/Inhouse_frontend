import Teacher from "../Layouts/Teacher";
import General from "../pages/Teacher/General";
import TDashboard from "../pages/Teacher/TDashboard";

export const TeacherRoutes = {
  path: "t/",
  element: <Teacher />,
  // errorElement: <ErrorPage/>,
  children: [
    {
      path: "dashboard",
      element: <TDashboard />,
    },
    {
      path: "general",
      element: <General />,
    },
  ],
};
