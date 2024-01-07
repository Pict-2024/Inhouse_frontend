import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NavList from "../components/NavList";
import { useEffect } from "react";

export default function Admin ()  {

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
      <div className="min-h-full  font-poppins ">
        <div className="w-full h-full  font-poppins ">{
            currentUser && currentUser.Role == 0 ?
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
    )
}