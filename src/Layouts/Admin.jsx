import { Outlet } from "react-router-dom";

export default function Admin ()  {
    return (
      <div className="min-h-full  font-poppins ">

          {/* something */}
        <div className="w-full h-full  font-poppins ">
            <Outlet/>
        </div>
    </div>
    )
}