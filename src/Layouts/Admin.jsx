import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NavList from "../components/NavList";
import { useEffect } from "react";
import AdminSidebar from "../components/AModule/AdminSidebar";

export default function Admin() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if currentUser is not present, then redirect to "/"
    if (!currentUser || currentUser.Role !== 0) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.Role !== 0) {
    // If redirecting, return null or an empty div
    return null;
  }

  return (
    <div className="min-h-full  font-poppins">
      <div className="w-full h-full  font-poppins ">
        {currentUser && currentUser.Role == 0 ? (
          <>
            <div className="flex flex-col  w-full">
              <NavList />
              <div className="w-full flex font-poppins ">
                <span className="hidden sm:block ">
                  <AdminSidebar />
                </span>
                <div className="border-l-2 w-full mx-0 px-0 overflow-x-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
