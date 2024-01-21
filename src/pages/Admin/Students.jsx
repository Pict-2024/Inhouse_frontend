import { useEffect, useState } from "react";
import Header from "../../components/AModule/Header";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";

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
      const apiurl = "http://localhost:5000/api/v1/auth/getAllStudent";
      const response = await axios.get(apiurl, {
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
    <div className="container mx-auto">
      <div className="flex items-center justify-between gap-2 mx-2">
        <div>
          <Header category="Page" title="Student" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <TextField
            label="Enter Student ID"
            variant="outlined"
            value={StudentId}
            className="w-80"
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            style={{ marginLeft: "10px" }}
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
