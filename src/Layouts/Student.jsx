import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from './'
// import Sidebar from "./../components/Sidebar";
import NavList from "../components/NavList";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Student() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if currentUser is not present, then redirect to "/"
    if (!currentUser || currentUser.Role !== 2) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.Role !== 2) {
    // If redirecting, return null or an empty div
    return null;
  }

  return (
    <div className="min-h-full  font-poppins ">
        <div className="w-full h-full  font-poppins ">
        {
          currentUser && currentUser.Role == 2 ?
          (
            <>
              <NavList />
              <Outlet/>
            </>
          ) : (
              <></>
          )
        }
        </div>
    </div>
  );
}

