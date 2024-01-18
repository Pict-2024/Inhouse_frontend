// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";

// export default function Sidebar() {
//   return (
//     <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
//       <div className="mb-2 p-4">
//         <Typography variant="h5" color="blue-gray">
//           Student
//         </Typography>
//       </div>
//       <List>
//         <ListItem>
//           <ListItemPrefix>
//             <PresentationChartBarIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Dashboard
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <ShoppingBagIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           E-Commerce
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <InboxIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Inbox
//           <ListItemSuffix>
//             <Chip
//               value="14"
//               size="sm"
//               variant="ghost"
//               color="blue-gray"
//               className="rounded-full"
//             />
//           </ListItemSuffix>
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <UserCircleIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Profile
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <Cog6ToothIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Settings
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <PowerIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Log Out
//         </ListItem>
//       </List>
//     </Card>
//   );
// }
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
    <div className="h-[90vh] lg:w-1/5 w-1/24 sm:w-2/5 p-4 shadow-blue-gray-900/5 hidden sm:block">
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="flex justify-start items-center gap-4"
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
            Internship
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
