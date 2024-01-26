import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsIndustrial, uploadRecordsIndustrial } from "./API_Routes";

export default function IndustrialVisit() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Name_Of_Industry_Visited: "",
    Purpose_of_the_visit: "",
    No_of_Students: "",
    Date_of_visit: "",
    Coordinator: "",
    Finance_Support_By_PICT: "",
    Upload_Report: null,
    Evidence: null,
    List_of_Students: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (file) => {
    try {
      console.log("file as:", file);

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "industrial_fields_tour");

      const response = await axios.post(
        uploadRecordsIndustrial,
        formDataForFile
      );
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

    var pathEvidence=null, pathReport, pathStudent;
    console.log(isFinancialSupport);
    console.log(formData.Evidence);
    // Check if evidence upload is required
    if (isFinancialSupport && formData.Evidence === null) {
      alert("Upload Evidence document");
      return;
    }

    try {
      if (isFinancialSupport ) {
        console.log("hi");
        // Handle evidence upload only if financial support is selected
        pathEvidence = await handleFileUpload(formData.Evidence);
      }
      if (
        formData.Upload_Report !== null &&
        formData.List_of_Students !== null
      ) {
        console.log("1");

        console.log("2");
        pathReport = await handleFileUpload(formData.Upload_Report);
        console.log("3");
        pathStudent = await handleFileUpload(formData.List_of_Students);
        console.log("4");

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
      // console.log("Evidence path:",pathEvidence);
      // If file upload is successful, continue with the form submission
     
      const formDataWithFilePath = {
        ...formData,

        Evidence: pathEvidence,
        Upload_Report: pathReport,
        List_of_Students: pathStudent,
      };
      if (pathEvidence === "" && pathReport === "" && pathStudent === "") {
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
      await axios.post(addRecordsIndustrial, formDataWithFilePath);

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
          Industrial Visits / Tours / Field Trip
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
                Name and address of the Company / Industry visited
              </Typography>
              <Input
                size="lg"
                name="Name_Of_Industry_Visited"
                value={formData.Name_Of_Industry_Visited}
                label="Name and address of the Company / Industry visited"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Purpose of the visit
              </Typography>
              <Input
                size="lg"
                name="Purpose_of_the_visit"
                value={formData.Purpose_of_the_visit}
                label="Purpose of the visit"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Coordinator(s)
              </Typography>
              <Input
                size="lg"
                name="Coordinator"
                type="text"
                value={formData.Coordinator}
                label="Coordinator(s)"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of visit (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                name="Date_of_visit"
                value={formData.Date_of_visit}
                label="Date of visit"
                type="date"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Students
              </Typography>
              <Input
                size="lg"
                name="No_of_Students"
                value={formData.No_of_Students}
                label="No. of Students"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of Students
              </Typography>
              <Input
                size="lg"
                name="List_of_Students"
                type="file"
                label="List of Students"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Financial support from institute in INR
                </Typography>
                <div className="flex gap-3">
                  <label className="mx-2">
                    <input
                      type="radio"
                      name="financialSupport"
                      value="yes"
                      checked={isFinancialSupport}
                      onChange={() => setIsFinancialSupport(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="financialSupport"
                      value="no"
                      checked={!isFinancialSupport}
                      onChange={() => setIsFinancialSupport(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Amount in INR"
                    name="Finance_Support_By_PICT"
                    type="number"
                    value={formData.Finance_Support_By_PICT}
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    name="Evidence"
                    type="file"
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Report with approval application
              </Typography>
              <Input
                size="lg"
                name="Upload_Report"
                type="file"
                label="Report with approval application"
                onChange={handleChange}
              />
            </div>
          </div>

          <Button className="mt-4" fullWidth type="submit">
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
