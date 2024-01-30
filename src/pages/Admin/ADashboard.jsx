import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { getCountAllTables } from "./AdminApis";

// ... (imports)

export const ADashBoard = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState({
    students: [],
    teachers: [],
  });
  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   return currentDate.toISOString().split("T")[0];
  // };

  const fetchAllTablesData = async () => {
    try {
      const response = await axios.get(getCountAllTables);
      // console.log("Tables response", response.data.data);
      // Update the state with fetched table data
      const studentTablesData = response?.data?.data?.Student_Tables || [];
      const teacherTablesData = response?.data?.data?.Teacher_Tables || [];

      const formattedStudentData = studentTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        return { label: tableName, value: count };
      });

      const formattedTeacherData = teacherTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        return { label: tableName, value: count };
      });

      setTableData({
        students: formattedStudentData,
        teachers: formattedTeacherData,
        // Add other roles as needed
      });
      console.log("Table data:", tableData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTablesData();
  }, []);

  return (
    <>
      {/* Card data */}
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
    </>
  );
};
