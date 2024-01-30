import { useEffect, useState } from "react";
import Header from "../../components/AModule/Header";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Input } from "@material-tailwind/react";
import { getAllStudent } from "./AdminApis";

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [StudentId, setStudentId] = useState("");

  const handleButtonClick = () => {
    StudentId === ""
      ? alert("Enter StudentID...")
      : navigate(`/a/viewInfo?StudentId=${StudentId}`);
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get(getAllStudent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setStudents(response.data.data);
      // console.log("Students are : ", students);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="container ">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mx-2">
        <div>
          <Header category="Page" title="Student" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between p-0 gap-4">
          <Input
            label="Enter Student ID"
            variant="outlined"
            value={StudentId}
            className="w-80 py-0"
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleButtonClick}
            endIcon={<SendIcon />}
          >
            View Student Data
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto mx-4">
        <table className="mt-4 w-70 min-w-max table-auto text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Name
                </Typography>
              </th>
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Email
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr key={student.Username} className="hover:bg-light-blue-50">
                <td className="py-2 px-4 border-b">{student.Name}</td>
                <td className="py-2 px-4 border-b">{student.Username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
