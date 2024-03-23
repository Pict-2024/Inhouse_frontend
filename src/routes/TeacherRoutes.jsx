import Teacher from "../Layouts/Teacher";
import General from "../pages/Teacher/General";
import Data from "../pages/Teacher/Data";
import TDashboard from "../pages/Teacher/TDashboard";
import Report from "../pages/Teacher/Report";

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
    {
      path: "data",
      element: <Data />,
    },
    {
      path: "report",
      element: <Report/>
    }
  ],
};
