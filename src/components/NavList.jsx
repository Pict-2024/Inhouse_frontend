import { Link, useLocation } from "react-router-dom";
export default function NavList() {
  var user = null;

  const location = useLocation();
  const isTeacherDashboard = location.pathname === "/t/dashboard";

  return (
    <nav className="m-auto block w-full max-w-screen-xl rounded-xl border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div>
        <div className="container mx-auto flex items-center justify-between text-gray-900">
          <Link
            to={"/"}
            className="mr-4 block cursor-pointer py-1.5 font-sans text-sm font-normal leading-normal text-inherit antialiased"
          >
            <span>PICT</span>
          </Link>

          {user === null ? (
            <Link to={"/auth/login"}>
              <button
                className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                data-ripple-light="true"
              >
                <span>Log In</span>
              </button>
            </Link>
          ) : (
            <div className="flex items-center">
              {!isTeacherDashboard && (
                <Link to={"/t/dashboard"}>
                  <button
                    className="mx-2 middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                    data-ripple-light="true"
                  >
                    <span>Teacher Dashboard</span>
                  </button>
                </Link>
              )}
              <div className="mx-2 flex items-center">
                <i className="fa-solid fa-user"></i>
                <div className="rounded-full bg-gray-400 w-8 h-8 flex items-center justify-center text-dark font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : user[0]}
                </div>
                <button
                  className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block ml-2"
                  type="button"
                  data-ripple-light="true"
                >
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
