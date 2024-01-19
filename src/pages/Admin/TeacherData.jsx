import { useLocation } from "react-router";
import TDashboard from "../Teacher/TDashboard";


const TeacherData = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const teacherId = searchParams.get("teacherId");
    console.log(teacherId);
  return (
    <div>TeacherData
        <TDashboard teacherId={teacherId}/>
    </div>
  )
}

export default TeacherData;