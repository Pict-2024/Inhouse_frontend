import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function NavList() {

  const { currentUser } = useSelector((state) => state.user);

  var pathLink = "";

  if(currentUser && currentUser.Role === 0)
  {
    pathLink = "/a/dashboard";
  }
  else if(currentUser && currentUser.Role === 1)
  {
    pathLink = "/t/dashboard";
  }
  else if(currentUser && currentUser.Role === 2)
  {
    pathLink = "/s/dashboard";
  }
  

  return (
    <nav className=" block w-full  rounded-xl border  border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div>
        <div className="w-full flex items-center justify-between text-gray-900">
          <Link
            to={"/"}
            className="mr-4 w-full font-bold cursor-pointer py-1.5 font-sans text-lg  leading-normal text-inherit antialiased"
          >
            <span>PICT</span>
          </Link>
          {currentUser === null ? (
            <Link to={"/auth/login"} className=" w-full flex items-center justify-end">
              <button
                className=" rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                type="button"
                data-ripple-light="true"
              >
                <span>Log In</span>
              </button>
            </Link>
          ) : (


            <div className=" w-full flex items-center justify-end ">
              {currentUser && (
                <Link to={pathLink}>
                  <button
                    className="mx-2 middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                    data-ripple-light="true"
                  >
                    <span>Dashboard</span>
                  </button>
                </Link>
              )}
              <div className="mx-2 flex items-center">
                <i className="fa-solid fa-user"></i>
                <div className="rounded-full bg-gray-400 w-8 h-8 flex items-center justify-center text-dark font-bold">
                  {currentUser.Name ? currentUser.Name[0] : 'A'}
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
