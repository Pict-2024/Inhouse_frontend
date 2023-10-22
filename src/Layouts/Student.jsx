import { Outlet } from "react-router-dom";
// import Sidebar from './'
// import Sidebar from "./../components/Sidebar";
import NavList from "../components/NavList";

export default function Student() {
  return (
    <div className="h-full w-full flex font-poppins ">
      {/* something */}
      {/* <Sidebar /> */}
      <div className="w-full h-full  font-poppins ">
        <NavList />
        <Outlet />
      </div>
    </div>
  );
}

