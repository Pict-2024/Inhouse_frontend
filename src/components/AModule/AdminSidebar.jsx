// import { Link, NavLink } from "react-router-dom";

import { links } from "../../data/dummy";
import "../../App.css";

import { Link } from "react-router-dom";

import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import "../../App.css";
import { useSelector } from "react-redux";

const AdminSidebar = ({ closeSidebar }) => {
  const { currentUser } = useSelector((state) => state.user);
  const activeLink =
    "flex items-center gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-white text-md m-2 w-full";
  const normalLink =
    "flex items-center gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black m-2 w-full";

  return (
    <div className="h-auto lg:max-w-[18rem] w-1/24 sm:w-2/5 p-4 shadow-blue-gray-900/5">
      <>
        <div className="mb-1 p-2">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex justify-start items-center gap-2"
          >
            <div className="rounded-full bg-gray-400 p-3 w-10 h-10 flex items-center justify-center text-dark font-bold">
              {currentUser.Name ? currentUser.Name[0] : "A"}
            </div>
            <div>
              <p className="font-semibold"> {currentUser.Name} </p>
              <p className="text-xs font-normal"> {currentUser.Username} </p>
            </div>
          </Typography>
        </div>
        <div>
          <List className="mt-2 p-4">
            {links.map((item) => (
              <div key={item.title}>
                {item.links.map((link) => (
                  <Link
                    to={`/a/${link.name}`}
                    onClick={closeSidebar}
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
