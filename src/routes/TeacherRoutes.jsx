import Teacher from "../Layouts/Teacher";
import TDashboard from "../pages/Teacher/TDashboard";
import Research from './../components/TModule/Research';

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
      path: "research",
      element: <Research />,
    },
  ],
};
