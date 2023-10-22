import { Outlet } from "react-router-dom";
import NavList from "../components/NavList";
import TeacherSidebar from "../components/TModule/TeacherSidebar";

export default function Teacher ()  {
    return (
    //   <div className="min-h-full  font-poppins ">
    //       {/* something */}
    //     <div className="w-full h-full  font-poppins ">
    //         <Outlet/>
    //     </div>
    // </div>
     <div className="h-full w-full font-poppins flex">
     {/* something */}
     <TeacherSidebar />
     <div className="w-full h-full  font-poppins ">
       <NavList />
       <Outlet />
     </div>
   </div>
    )
}