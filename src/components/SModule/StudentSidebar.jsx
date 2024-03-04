
import { Link } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  TrophyIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

export default function StudentSidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="h-auto lg:max-w-[18rem] w-1/24 sm:w-2/5 p-4 shadow-blue-gray-900/5  hidden sm:block">
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="flex justify-start items-center gap-4"
        >
          <div className="rounded-full px-4 bg-gray-400 w-10 h-10 flex items-center justify-center text-dark font-bold">
            {currentUser.Name ? currentUser.Name[0] : "A"}
          </div>
          <div>
            <p className="font-semibold text-ellipsis overflow-hidden"> {currentUser.Name} </p>
            <p className="text-xs font-normal text-ellipsis overflow-hidden"> {currentUser.Username} </p>
          </div>
        </Typography>
      </div>
      <List>
        <Link to={"/s/dashboard"}>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to={"/s/general"} className="text-ellipsis">
          <ListItem>
            <ListItemPrefix>
              <TrophyIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add Details
          </ListItem>
        </Link>
        <Link to={"/s/data"}>
          <ListItem>
            <ListItemPrefix>
              <DocumentIcon className="h-5 w-5" />
            </ListItemPrefix>
            View Uploads
          </ListItem>
        </Link>
        {/* {currentUser && currentUser.SpecialAccess !== null && (
          <Link to={`/s/report/${currentUser.SpecialAccess}`}>
            <ListItem>
              <ListItemPrefix>
                <DocumentChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Reports
            </ListItem>
          </Link>
        )} */}
      </List>
    </div>
  );
}
