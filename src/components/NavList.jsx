import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import React, {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  // Navbar,
  // MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  PowerIcon,
  // CubeTransparentIcon,
  // CodeBracketSquareIcon,
  // Cog6ToothIcon,
  // LifebuoyIcon,
  // RocketLaunchIcon,
  // Bars2Icon,
} from "@heroicons/react/24/solid";


import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { resetUser } from "../redux/user/userSlice";


const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/t/dashboard"
  },
  {
    label: "Achievements",
    icon: Square3Stack3DIcon,
    link: "/t/general"
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    link: "/t/general"
  },
  // {
  //   label: "Help",
  //   icon: LifebuoyIcon,
  // },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];


function ProfileMenu() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const closeMenu = (isLastItem, link) => {
    setIsMenuOpen(false);
    if(isLastItem)
    {
      handleOpen("xs");
    }
    else
    {
      navigate(link);
    }
  }
 
  const handleLogout = () => {
    handleOpen(null);
    dispatch(resetUser());
    navigate("/");
    toast.success('Logout Successful', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  }


  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => closeMenu(isLastItem, link)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>

      <Dialog
      open={
        size === "xs" ||
        size === "sm"
      }
      size={size || "sm"}
      handler={handleOpen}
    >
      <DialogHeader>Warning</DialogHeader>
      <DialogBody>
        Are you sure you want to logout ?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => handleOpen(null)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => handleLogout()}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>

    </Menu>


    

  );
}


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
              
              <div className="mx-2 flex items-center">
                <i className="fa-solid fa-user"></i>
                {/**<div className="rounded-full bg-gray-400 w-8 h-8 flex items-center justify-center text-dark font-bold">
                  {currentUser.Name ? currentUser.Name[0] : 'A'}
          </div>**/}
                <ProfileMenu />
              </div>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}
