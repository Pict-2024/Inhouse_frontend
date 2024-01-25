import { IconButton, Modal, Box } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

// ... (imports)

export const ADashBoard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState({
    students: [],
    teachers: [],
  });
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };
  const [notificationData, setNotificationData] = useState({
    Username: currentUser?.Username,
    Title: "",
    Description: "",
    Role: currentUser?.Role,
    date: getCurrentDate(),
  });


  const fetchAllTablesData = async () => {
    try {
      const apiUrl = "http://localhost:5000/api/v1/general/get-count-tables";
      const response = await axios.get(apiUrl);
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
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Teacher Records
          </Typography>
          <div
            className="flex justify-around gap-2 flex-wrap -mx-4"
            style={{ width: "90%" }}
          >
            {tableData?.teachers?.map((table, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-1 my-2 transition duration-300 relative group"
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
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Student Records
          </Typography>
          <div
            className="flex justify-around gap-2 flex-wrap -mx-4"
            style={{ width: "90%" }}
          >
            {tableData?.students?.map((table, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-1 my-2 transition duration-300 relative group"
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
