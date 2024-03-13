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

import {
  addRecordsContribution,
  uploadRecordsContribution,
} from "./API_Routes";

export default function Contribution() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Academic_Year: "",
    Role: "",
    University_Institution: "",
    Body_Name: "",
    Upload_Evidence: null,
  });

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const generateAcademicYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const Options = [];

    for (let year = 2023; year <= currentYear; year++) {
      const academicYearStart = `${year}-${year + 1}`;
      Options.push(
        <Option key={academicYearStart} value={academicYearStart}>
          {academicYearStart}
        </Option>
      );
    }

    return Options;
  };

  const handleFileUpload = async (file) => {
    try {
      console.log("file as:", file);
      // if (!file || !file.length) {
      //   // If file is null, display a toast alert

      // }

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "contribution_to_bos");
      formDataForFile.append("columnName", "Upload_Evidence");

      const response = await axios.post(
        uploadRecordsContribution,
        formDataForFile
      );
      // console.log(response);
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

    var pathUpload;
    console.log(formData.Upload_Evidence);
    try {
      if (formData.Upload_Evidence !== null) {
        console.log("hello");
        pathUpload = await handleFileUpload(formData.Upload_Evidence);

        console.log("Upload path = ", pathUpload);
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
        Upload_Evidence: pathUpload, // Use an empty string as a default if fileUploadPath is undefined
      };
      if (pathUpload === "") {
        // If file is null, display a toast alert
        toast.error("Some e rror occurred while uploading file", {
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
      await axios.post(addRecordsContribution, formDataWithFilePath);

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
          Contribution to BoS
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
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
                  handleOnChange({
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Academic Year
              </Typography>
              <Select
                size="lg"
                name="Academic_Year"
                value={formData.Academic_Year}
                label="Academic Year"
                onChange={(value) =>
                  handleOnChange({
                    target: { name: "Academic_Year", value },
                  })
                }
              >
                {generateAcademicYearOptions()}
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Select
                size="lg"
                name="Role"
                value={formData.Role}
                label="Role"
                onChange={(value) =>
                  handleOnChange({
                    target: { name: "Role", value },
                  })
                }
              >
                <Option value="BOS chairman">BOS Chairman</Option>
                <Option value="BOS member">BOS Member</Option>
                <Option value="Paper setter">Paper Setter</Option>
                <Option value="Paper Evaluator">Paper Evaluator</Option>
                <Option value="Theory Subject Chairman">
                  Theory Subject Chairman
                </Option>
                <Option value="Practical/Oral Subject Chairman">
                  Practical/Oral Subject Chairman
                </Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                University/Institution
              </Typography>
              <Input
                size="lg"
                name="University_Institution"
                type="text"
                value={formData.University_Institution}
                label="University/Institution"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Body Name
              </Typography>
              <Input
                size="lg"
                name="Body_Name"
                type="text"
                value={formData.Body_Name}
                label="Name of Body"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Evidence document
              </Typography>
              <Input
                name="Upload_Evidence"
                size="lg"
                type="file"
                label="Evidence Document"
                onChange={handleOnChange}
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
