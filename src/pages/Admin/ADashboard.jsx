import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { getCountAllTables } from "./AdminApis";

// ... (imports)
import Spinner from './../../components/Spinner';

export const ADashBoard = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState({
    students: [],
    teachers: [],
  });
  const [loading, setLoading] = useState(false);
  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   return currentDate.toISOString().split("T")[0];
  // };
  const studentMapping = {
    student_internship_details: "Student Internship Details",
    student_research_publication: "Student Research Publication",
    student_conference_publication: "Student Conference Publication",
    student_certificate_course: "Student Certificate Course",
    student_sports_data: "Student Sports Data",
    student_event_participated: "Student Event Participated",
    student_event_organized: "Student Event Organized",
    student_technical_events: "Student Technical Events",
    student_higher_education: "Student Higher Education",
  };

  const teacherMapping = {
    research_publication: "Research Publications",
    book_publication: "Book Publications",
    faculty_conference_publication: "Faculty Conference Publications",
    grants: "Grants",
    consultancy_report: "Consultancy Reports",
    patent_publication: "Patent Publications",
    conference_seminar_workshops: "Conference Seminar Workshops",
    sttp_fdp_conference_attended: "STTP/FDP Conference Attended",
    webinar_guest_lectures: "Webinar Guest Lectures",
    mous: "Memorandums of Understanding (MoUs)",
    certificate_courses: "Certificate Courses",
    professional_affiliation: "Professional Affiliations",
    resource_person: "Resource Persons",
    extension_activity: "Extension Activities",
    technical_competition_fest: "Technical Competitions/Fests",
    faculty_achievements: "Faculty Achievements",
    industrial_fields_tour: "Industrial Fields Tours",
    contribution_to_bos: "Contribution to Board of Studies (BOS)",
  };

  const fetchAllTablesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getCountAllTables);
      // console.log("Tables response", response.data.data);
      // Update the state with fetched table data
      const studentTablesData = response?.data?.data?.Student_Tables || [];
      const teacherTablesData = response?.data?.data?.Teacher_Tables || [];

      const formattedStudentData = studentTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        const formattedLabel = studentMapping[tableName] || tableName; // Use mapping if available, otherwise fallback to original label
        return { label: formattedLabel, value: count };
      });

      const formattedTeacherData = teacherTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        const formattedLabel = teacherMapping[tableName] || tableName;
        return { label: formattedLabel, value: count };
      });
      // console.log("student:", formattedTeacherData);

      setTableData({
        students: formattedStudentData,
        teachers: formattedTeacherData,
        // Add other roles as needed
      });
      setLoading(false);
      // console.log("Table data:", tableData);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTablesData();
  }, []);

  return (
    <>
      {loading ? <Spinner /> :
        <>
          <div className="flex flex-col m-1">
            {/* Teacher Records Section */}
            <div className="mb-4 ">
              <Typography variant="h4" color="blue-gray" className="mb-2 mx-4">
                Teacher Records
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                {tableData?.teachers?.map((table, index) => (
                  <div
                    key={index}
                    className="w-full  px-4 py-1 transition duration-300 relative group"
                  >
                    <Card
                      className="w-full h-full rounded-lg p-4"
                      style={{
                        backgroundColor: index % 2 !== 0 ? "#F0F0F0" : "#D6EAF8",
                        transition: "transform 0.3s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <CardBody>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className=" text-center mb-2 break-words"
                        >
                          {table.label}
                        </Typography>
                        <Typography variant="body2" className="text-center">
                          {table.value}
                        </Typography>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Records Section */}
            <div>
              <Typography variant="h4" color="blue-gray" className="mb-2 mx-4">
                Student Records
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                {tableData?.students?.map((table, index) => (
                  <div
                    key={index}
                    className="w-full  px-4 py-1 transition duration-300 relative group"
                  >
                    <Card
                      className="w-full h-full rounded-lg p-4"
                      style={{
                        backgroundColor: index % 2 !== 0 ? "#F0F0F0" : "#D6EAF8",
                        transition: "transform 0.3s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <CardBody>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="text-center mb-2 break-words"
                        >
                          {table.label}
                        </Typography>
                        <Typography variant="body2" className="text-center">
                          {table.value}
                        </Typography>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>}
    </>
  );
};
