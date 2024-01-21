// import { Link, NavLink } from "react-router-dom";

import { links } from "../../data/dummy";
import "../../App.css";

// const AdminSidebar = () => {
//

//   return (
//     <div className="h-[90vh] lg:max-w-[15rem] w-1/24 sm:w-2/5 p-2 shadow-blue-gray-900/5  hidden sm:block">
//       <>
//         <div className="flex justify-between items-center">
//           <Link
//             to="/"
//             className="items-center gap-3 ml-3 mt-2 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
//           >
//             <span>Admin Dashboard</span>
//           </Link>
//         </div>
//         <div className="mt-10">
//           {links.map((item) => (
//             <div key={item.title}>
//               <p className="text-gray-400 dark:text-gray-400 m-3 mt-2 uppercase">
//                 {item.title}
//               </p>
//               {item.links.map((link) => (
//                 <NavLink
//                   to={`/a/${link.name}`}
//                   key={link.name}
//                   style={{ color: "black" }}
//                   className={({ isActive }) =>
//                     isActive ? activeLink : normalLink
//                   }
//                 >
//                   {link.icon}
//                   <span className="capitalize ">{link.name}</span>
//                 </NavLink>
//               ))}
//             </div>
//           ))}
//         </div>
//       </>
//     </div>
//   );
// };

// export default AdminSidebar;

import { Link } from "react-router-dom";

import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import "../../App.css";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const activeLink =
    "flex items-center gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-white text-md m-2 w-full"; 
  const normalLink =
    "flex items-center gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black m-2 w-full";

  return (
    <div className="h-[90vh] lg:max-w-[15rem] w-1/24 sm:w-2/5 p-2 shadow-blue-gray-900/5 hidden sm:block">
      <>
        <div className="mb-1 p-2">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex justify-start items-center gap-2"
          >
            <div className="rounded-full bg-gray-400 w-10 h-10 flex items-center justify-center text-dark font-bold">
              {currentUser.Name ? currentUser.Name[0] : "A"}
            </div>
            <div>
              <p className="font-semibold"> {currentUser.Name} </p>
              <p className="text-xs font-normal"> {currentUser.Username} </p>
            </div>
          </Typography>
        </div>
        <div>
          <List className="mt-2">
            {links.map((item) => (
              <div key={item.title}>
                <ListItem className="text-blue-gray-900 underline m-3 mt-2 uppercase w-full hover:bg-transparent">
                  {item.title}
                </ListItem>
                {item.links.map((link) => (
                  <Link
                    to={`/a/${link.name}`}
                    key={link.name}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <ListItem className="hover:w-full">
                      {" "}
                      {/* Adjust the width as needed */}
                      <ListItemPrefix>{link.icon}</ListItemPrefix>
                      <span className="capitalize">{link.name}</span>
                    </ListItem>
                  </Link>
                ))}
              </div>
            ))}
          </List>
        </div>
      </>
    </div>
  );
};

export default AdminSidebar;
