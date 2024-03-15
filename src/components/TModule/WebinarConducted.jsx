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
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});
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
    Upload_List_of_Students: "",
    Upload_Evidence: null,
    Upload_Report: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (files) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "webinar_guest_lectures");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_List_of_Students) {
        formDataForUpload.append("files", formData.Upload_List_of_Students);
        columnNames.push("Upload_List_of_Students");
      }
      if (formData.Upload_Evidence) {
        formDataForUpload.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence");
      }
      if (formData.Upload_Report) {
        formDataForUpload.append("files", formData.Upload_Report);
        columnNames.push("Upload_Report");
      }


      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsWebinar}?${queryParams.toString()}`;
      console.log("formdata", formDataForUpload)
      const response = await axios.post(url, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data?.uploadResults);
      return response?.data?.uploadResults;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error?.response?.data?.message, {
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
      // Handle error as needed
    }
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.Upload_Evidence === null || formData.Upload_List_of_Students === null ||
      formData.Upload_Report === null) {
      toast.error("Select file for upload", {
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
    try {
      const filesToUpload = [];

      if (formData.Upload_List_of_Students !== null) {
        filesToUpload.push(formData.Upload_List_of_Students);
      }
      if (formData.Upload_Evidence !== null) {
        filesToUpload.push(formData.Upload_Evidence);
      }
      if (formData.Upload_Report !== null) {
        filesToUpload.push(formData.Upload_Report);
      }

      // If file upload is successful, continue with the form submission
      const uploadResults = await handleFileUpload(filesToUpload);

      // Store the paths of uploaded files in the uploadedFilePaths object
      const updatedUploadedFilePaths = { ...uploadedFilePaths };
      uploadResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });
      setUploadedFilePaths(updatedUploadedFilePaths);

      // Merge uploaded file paths with existing formData
      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };

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
      toast.error(error?.response?.data?.message, {
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
                name="Upload_List_of_Students"
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
                name="Upload_Evidence"
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
                name="Upload_Report"
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
