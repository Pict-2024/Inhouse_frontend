import { Outlet } from "react-router-dom";
import {Sidebar} from "./../components/Sidebar";
import Navbar from "./../components/Navbar";

export default function Student() {
  return (
    <div className="min-h-full min-w-full flex justifyContent font-poppins ">
      <Sidebar />
      
      <div className="w-full h-full  font-poppins ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
