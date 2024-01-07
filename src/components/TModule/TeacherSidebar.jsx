
import { Link } from "react-router-dom";
import {
  // Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  TrophyIcon,
  DocumentIcon,
  DocumentChartBarIcon
 
} from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';

export default function TeacherSidebar() {
  
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" h-[90vh] lg:max-w-[20rem] w-1/12 sm:w-2/5 p-4 shadow-blue-gray-900/5 hidden sm:block">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" className='flex justify-start items-center gap-4'>
          <div className="rounded-full bg-gray-400 w-10 h-10 flex items-center justify-center text-dark font-bold">
            {currentUser.Name ? currentUser.Name[0] : 'A'}
          </div>
          <div>
            <p className='font-semibold'> {currentUser.Name} </p>
            <p className='text-xs font-normal'> {currentUser.Email} </p>
          </div>
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={'/t/dashboard'}>Dashboard</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TrophyIcon className="h-5 w-5" />
          </ListItemPrefix>
         <Link to={'/t/general'} className='text-ellipsis'>Add Achievements</Link>
        </ListItem>
        
        <ListItem>
          <ListItemPrefix>
            <DocumentIcon className="h-5 w-5" />
          </ListItemPrefix>
         <Link to={'/t/general'}>View Uploads</Link>
        </ListItem>
        
        <ListItem>
          <ListItemPrefix>
            <DocumentChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
         <Link to={'/t/general'}>Reports</Link>
        </ListItem>
      </List>
    </div>
  );
}
