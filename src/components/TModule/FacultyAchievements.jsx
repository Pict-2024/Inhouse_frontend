import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addRecordsAchievements,
  uploadRecordsAchievements,
} from "./API_Routes";

export default function FacultyAchievements() {
  const { currentUser } = useSelector((state) => state.user);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Achievement_Details: "",
    Name_of_Event: "",
    Name_of_Organiser: "",
    Level: "",
    Award_Type: "",
    Award_Prize_Money: "",
    Upload_Certificate: null,
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
      queryParams.append("tableName", "faculty_achievements");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_Certificate) {
        formDataForUpload.append("files", formData.Upload_Certificate);
        columnNames.push("Upload_Certificate");
      }

      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsAchievements}?${queryParams.toString()}`;
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

    if (formData.Upload_Certificate === null) {
      toast.error("Select file to upload", {
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
      if (formData.Upload_Certificate !== null) {
        filesToUpload.push(formData.Upload_Certificate);
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
      await axios.post(addRecordsAchievements, formDataWithFilePath);

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
    <div className="">
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-85  p-2 mt-2 rounded-md overflow-x-hidden"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          Faculty Achievement
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
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
                Name of Event
              </Typography>
              <Input
                size="lg"
                name="Name_of_Event"
                value={formData.Name_of_Event}
                type="text"
                label="Name of Event"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Organizer
              </Typography>
              <Input
                size="lg"
                name="Name_of_Organiser"
                type="text"
                value={formData.Name_of_Organiser}
                label="Name of Organizer"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievement / Awards Details
              </Typography>
              <Input
                size="lg"
                name="Achievement_Details"
                type="text"
                value={formData.Achievement_Details}
                label="Achievement / Awards Details"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievement Level
              </Typography>
              <Select
                size="lg"
                name="Level"
                value={formData.Level}
                label="Select Level"
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Level", value },
                  })
                }
              // onChange={handleInputChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State">State</Option>
                <Option value="University">University</Option>
                <Option value="District">District</Option>
                <Option value="Institue">Institue</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award Type
              </Typography>
              <Select
                size="lg"
                name="Award_Type"
                value={formData.Award_Type}
                label="Select Award Type"
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Award_Type", value },
                  })
                }
              // onChange={handleInputChange}
              >
                <Option value="Winner">Winner</Option>
                <Option value="Runner">Runner</Option>
                <Option value="Consolation">Consolation</Option>
                <Option value="Appreciation">Appreciation</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award/Prize Money
              </Typography>
              <Input
                size="lg"
                name="Award_Prize_Money"
                value={formData.Award_Prize_Money}
                label="Award/Prize Money"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full  px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Certificate
              </Typography>
              <Input
                size="lg"
                name="Upload_Certificate"
                type="file"
                label="Certificate"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
