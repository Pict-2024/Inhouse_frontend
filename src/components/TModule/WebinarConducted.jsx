import {
  Card,
  Input,
  Button,
  Typography,
  Option,
  Select,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsWebinar, uploadRecordsWebinar } from "./API_Routes";

export default function WebinarConducted() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Activity_Event: "",
    Title: "",
    Speaker_Resource_Person: "",
    Resource_Person_Affiliation: "",
    No_of_Participants: "",
    Remarks: "",
    Start_Date: null,
    End_Date: null,
    Name_of_Coordinators: "",
    Targeted_Audience: "",
    Duration_in_Hrs: "",
    Renumeration_Paid: "",
    List_of_Students: "",
    Evidence: null,
    Report: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (file) => {
    try {
      // console.log("file as:", file);

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "webinar_guest_lectures");
      formDataForFile.append("columnName", ["Evidence", "Report"]);

      const response = await axios.post(uploadRecordsWebinar, formDataForFile);
      console.log(response);
      // console.log("file response:", response.data.filePath);

      return response.data.filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
    }
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    var pathReport, pathEvidence, pathStudent;
    // console.log(formData.Sample_Certificate);
    try {
      if (
        formData.Report !== null &&
        formData.List_of_Students !== null &&
        formData.Evidence !== null
      ) {
        // console.log("2");
        pathReport = await handleFileUpload(formData.Report);
        // console.log("3");
        pathStudent = await handleFileUpload(formData.List_of_Students);
        pathEvidence = await handleFileUpload(formData.Evidence);
        // console.log("4");

        // console.log("Upload path = ", pathUpload);
      } else {
        toast.error("Please select a file for upload", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      // If file upload is successful, continue with the form submission
      const formDataWithFilePath = {
        ...formData,

        Report: pathReport,
        List_of_Students: pathStudent,
        Evidence: pathEvidence,
      };
      if (pathReport === "" && pathStudent === "" && formData.Evidence === "") {
        // If file is null, display a toast alert
        toast.error("Some error occurred while uploading file", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsWebinar, formDataWithFilePath);

      // Display a success toast
      toast.success("Record Added Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to "/t/data" after successful submission
      navigate("/t/data");
    } catch (error) {
      // Handle file upload error
      console.error("File upload error:", error);

      // Display an error toast
      toast.error("File upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-85 mx-auto p-2 my-2 rounded-md overflow-x-hidden"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          Webinar/Guest-Expert Lecture / Video conference /Invited talks
          organized /conducted
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                id="Department"
                size="lg"
                name="Department"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Department", value },
                  })
                }
              >
                <Option value="CS">CS</Option>
                <Option value="IT">IT</Option>
                <Option value="EnTC">EnTC</Option>
                <Option value="FE">FE</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Activity/Event
              </Typography>
              <Select
                size="lg"
                name="Activity_Event"
                label="Select Activity/Event"
                value={formData.Activity_Event}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Activity_Event", value },
                  })
                }
              >
                <Option value="FDP">FDP</Option>
                <Option value="Workshop">Workshop</Option>
                <Option value="Guest Expert Lecture">
                  Guest Expert Lecture
                </Option>
                <Option value="Webinar">Webinar</Option>
                <Option value="Video Conference">Video Conference</Option>
                <Option value="Others">Others</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                label="Title"
                name="Title"
                onChange={handleInputChange}
                value={formData.Title}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Speaker/Resource Person
              </Typography>
              <Input
                size="lg"
                label="Speaker/Resource Person"
                name="Speaker_Resource_Person"
                onChange={handleInputChange}
                value={formData.Speaker_Resource_Person}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Resource Person Affiliation
              </Typography>
              <Input
                size="lg"
                label="Resource Person Affiliation"
                name="Resource_Person_Affiliation"
                onChange={handleInputChange}
                value={formData.Resource_Person_Affiliation}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Participants
              </Typography>
              <Input
                size="lg"
                label="No. of Participants"
                type="number"
                name="No_of_Participants"
                onChange={handleInputChange}
                value={formData.No_of_Participants}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of Students (Only pdf)
              </Typography>
              <Input
                size="lg"
                name="List_of_Students"
                type="file"
                label="List of Students"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                label="Start Date"
                type="date"
                name="Start_Date"
                onChange={handleInputChange}
                value={formData.Start_Date}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                label="End Date"
                type="date"
                name="End_Date"
                onChange={handleInputChange}
                value={formData.End_Date}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the coordinator(s)
              </Typography>
              <Input
                size="lg"
                label="Name of the coordinator(s)"
                name="Name_of_Coordinators"
                onChange={handleInputChange}
                value={formData.Name_of_Coordinators}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Targeted Audience Faculty/Students
              </Typography>
              <Select
                size="lg"
                label="Targeted Audience Faculty/Students"
                name="Targeted_Audience"
                value={formData.Targeted_Audience}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Targeted_Audience", value },
                  })
                }
              >
                <Option value="Faculty">Faculty</Option>
                <Option value="Student">Student</Option>
                <Option value="Both">Both</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in Hrs
              </Typography>
              <Input
                size="lg"
                label="Duration in Hrs"
                name="Duration_in_Hrs"
                onChange={handleInputChange}
                value={formData.Duration_in_Hrs}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial Details/Remuneration Paid
              </Typography>
              <Input
                size="lg"
                label="Financial Details/Remuneration Paid"
                name="Renumeration_Paid"
                type="text"
                onChange={handleInputChange}
                value={formData.Renumeration_Paid}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Evidence document (Only Pdf)
              </Typography>
              <Input
                size="lg"
                label="Evidence document"
                name="Evidence"
                type="file"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Report (Only Pdf)
              </Typography>
              <Input
                size="lg"
                label="Report"
                name="Report"
                type="file"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remarks
              </Typography>
              <Input
                size="lg"
                label="Remarks"
                name="Remarks"
                type="text"
                onChange={handleInputChange}
                value={formData.Remarks}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
