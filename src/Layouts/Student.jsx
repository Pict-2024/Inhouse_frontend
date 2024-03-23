import { Outlet, useNavigate } from "react-router-dom";
import NavList from "../components/NavList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import StudentSidebar from "../components/SModule/StudentSidebar";

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
        {currentUser && currentUser.Role == 2 ? (
          <>
            <div className="flex flex-col w-full">
              <NavList />
              <div className="w-full flex font-poppins">
                <span className="hidden sm:block  ">
                  <StudentSidebar />
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
