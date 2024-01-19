import { useState } from "react";
import Header from "../../components/AModule/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function Students() {
  const [StudentId, setStudentId] = useState("");

  const handleButtonClick = () => {
    // You can replace this with your logic to fetch and display Student data
    console.log(
      `Fetching and displaying data for Student with ID: ${StudentId}`
    );
  };

  return (
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
  );
}
