import Student from "../Layouts/Student";
import Data from "../pages/Student/Data";
import General from "../pages/Student/General";
// import Achievements from "../pages/Student/Achievements";
// import CoCurricular from "../pages/Student/CoCurricular";
// import InternShip from "../pages/Student/InternShip";
import SDashboard from "../pages/Student/SDashboard";

export const StudentRoutes = {
  path: "s/",
  element: <Student />,
  // errorElement: <ErrorPage/>,
  children: [
    {
      path: "dashboard",
      element: <SDashboard />,
    },
    {
      path: "general",
      element: <General />,
    },
    {
      path: "data",
      element: <Data />,
    },

    // {
    //   path: "co-curricular",
    //   element: <CoCurricular />,
    // },
  ],
};
