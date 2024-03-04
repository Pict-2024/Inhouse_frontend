import { Outlet } from "react-router-dom";
import NavList from "../components/NavList";
import "../App.css"

export default function Auth() {
  return (
    <div className="min-h-full  font-poppins ">
      <div className="w-full h-full  font-poppins ">
        <NavList />
        <Outlet />
      </div>
    </div>
  );
}
