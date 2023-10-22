import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Student ()  {
    return (
      <div className="h-full w-full bg-red-100 font-poppins ">

      {/*
        <Sidebar/>
           something */}
        <div className="w-full h-full  font-poppins ">
          <Navbar/>
          <Outlet/>
        </div>
    </div>
    )
}