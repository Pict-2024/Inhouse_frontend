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

import { addRecordsMous, uploadRecordsMous } from "./API_Routes";

export default function FacultyExchange() {
  const { currentUser } = useSelector((state) => state.user);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  // Define state variables for form fields
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    MoU_Collaboration_linkage_Name: "",
    Name_of_the_collaboration: "",
    Faculty_coordinator: "",
    Department: "",
    Year_of_signing: "",
    Duration: "",
    Objectives_Purpose: "",
    Actual_Activity_Under_MOU: "",
    Finance_Support_Transaction: "",
    Upload_Report: null,
  });

  // Add new record
  const handleChange = (e) => {
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
      queryParams.append("tableName", "mous");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_Report) {
        formDataForUpload.append("files", formData.Upload_Report);
        columnNames.push("Upload_Report");
      }


      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsMous}?${queryParams.toString()}`;
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.Upload_Report === null) {
      toast.error("Select a file for upload", {
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
      await axios.post(addRecordsMous, formDataWithFilePath);

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
        className="border border-gray-300 w-85 mx-auto p-2 my-2 rounded-md"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          Number of MoUs, collaborations / linkages for Faculty exchange
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Name of the MoU / Collaboration / Linkage
            </Typography>
            <Input
              size="lg"
              name="MoU_Collaboration_linkage_Name"
              value={formData.MoU_Collaboration_linkage_Name}
              onChange={handleChange}
              label="Name of the MoU / Collaboration / Linkage"
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Name of the collaborating agency / institution / industry /
              corporate house
            </Typography>
            <Input
              size="lg"
              name="Name_of_the_collaboration"
              value={formData.Name_of_the_collaboration}
              onChange={handleChange}
              label="Collaborating Agency / Institution"
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Faculty Coordinator
              </Typography>
              <Input
                size="lg"
                name="Faculty_coordinator"
                value={formData.Faculty_coordinator}
                onChange={handleChange}
                label="Faculty Coordinator"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                size="lg"
                name="Department"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleChange({
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
                Year of Signing MoU / Collaboration / Linkage
              </Typography>
              <Select
                size="lg"
                name="Year_of_signing"
                value={formData.Year_of_signing}
                onChange={(value) =>
                  handleChange({ target: { name: "Year_of_signing", value } })
                }
                label="Select Year"
                color="light-gray"
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration of MoU / Collaboration / Linkage in hours
              </Typography>
              <Input
                size="lg"
                name="Duration"
                value={formData.Duration}
                onChange={handleChange}
                label="Duration "
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Objectives/Purpose of MoU, Collaboration/Linkages
            </Typography>
            <Input
              size="lg"
              name="Objectives_Purpose"
              value={formData.Objectives_Purpose}
              onChange={handleChange}
              label="Objectives/Purpose"
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              List the Actual Activities under each MoU and Web-Links Year-wise
            </Typography>
            <Input
              size="lg"
              name="Actual_Activity_Under_MOU"
              value={formData.Actual_Activity_Under_MOU}
              onChange={handleChange}
              label="Activities and Web-Links"
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Any Financial Support/Transaction
              </Typography>
              <Input
                size="lg"
                name="Finance_Support_Transaction"
                value={formData.Finance_Support_Transaction}
                onChange={handleChange}
                label="Financial Support/Transaction"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Report (Only Pdf)
              </Typography>
              <Input
                size="lg"
                name="Upload_Report"
                type="file"
                onChange={handleChange}
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
