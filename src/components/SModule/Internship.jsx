import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addRecordsInternship, uploadRecordsInternship } from "./API_Routes";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Internship() {
  const navigate = useNavigate();

  const [isPPO, setIsPPO] = useState("No");
  const [errors, setErrors] = useState({});

  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  // console.log("currentuser:", currentUser);
  const options = Array.from({ length: 11 }, (_, index) => index + 1);
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: null,
    Department: "",
    Class: "",
    Div: "",
    Mobile_No: "",
    Email_ID: currentUser?.Username,
    Internship_Title: "",
    Internship_Organizer: "",
    Internship_Company_Website_Address: "",
    Company_Address: "",
    Duration: "",
    Mode: "",
    Stipend: "",
    Internal_Mentor_Name: "",
    External_Mentor_Name: "",
    External_Mentor_Email: "",
    External_Mentor_Mobile: "",
    Upload_Completion_Certificate: null,
    Upload_Internship_Report: null,
    Upload_PPO_Offer: null,
    Remark: "",
  });

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

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ""
    }));

    setFormData({
      ...formData,
      [id]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
    // console.log("formdata = ", formData)
  };

  const handleFileUpload = async (files) => {
    try {

      console.log("file as:", files);

      const queryParams = new URLSearchParams();

      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "student_internship_details");

      let formDataForFile = new FormData();
      // formDataForFile.append("columnName", [
      //   "Upload_Completion_Certificate",
      //   "Upload_Internship_Report",
      //   "Upload_PPO_Offer",
      // ]);

      const columnNames = [];
      if(formData.Upload_Completion_Certificate)
      {
        formDataForFile.append("files", formData.Upload_Completion_Certificate);
        columnNames.push("Upload_Completion_Certificate");
      }

      if(formData.Upload_Internship_Report)
      {
        formDataForFile.append("files", formData.Upload_Internship_Report);
        columnNames.push("Upload_Internship_Report");
      }

      if(formData.Upload_PPO_Offer)
      {
        formDataForFile.append("files", formData.Upload_PPO_Offer);
        columnNames.push("Upload_PPO_Offer");
      }

      queryParams.append("columnNames", columnNames.join(","));
      console.log("query = ", queryParams);

      const url = `${uploadRecordsInternship}?${queryParams.toString()}`;
      console.log("formdata = ", formDataForFile);

      const response = await axios.post( url, formDataForFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data);

      return response?.data?.uploadResults;
      // console.log("file response:", response.data.filePath);

      // return response.data.filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
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
    }
  };

  //add new record
  const handleSubmit = async (e) => {
    // console.log("handle submit api hit");
    e.preventDefault();
    // Check for empty required fields
    const requiredFields = ["Academic_Year", "Department", "Class", "Div", "Internship_Title", "Internship_Organizer", "Internship_Company_Website_Address", "Company_Address", "Duration", "Mode", "Stipend", "Internal_Mentor_Name", "External_Mentor_Name", "External_Mentor_Email", "External_Mentor_Mobile", "Remark"];

    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.join(", ");
      alert(`Please fill in all required fields: ${emptyFieldNames}`);
      return;
    }

    // Validate Roll No
    if (!(/^\d{5}$/.test(formData.Roll_No))) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Roll_No: "Roll No must be a 5-digit number."
      }));
      return;
    }

    if (isPPO === "Yes" && formData.Upload_PPO_Offer === null) {
      alert("Upload PPO evidence");
      return;
    }

    try {
      const filesToUpload = [];

      if (isPPO === "Yes" && formData.Upload_PPO_Offer) {
        
        filesToUpload.push(formData.Upload_PPO_Offer);
        // ppoPath = await handleFileUpload(formData.Upload_PPO_Offer);
      }

      if (
        formData.Upload_Completion_Certificate !== null &&
        formData.Upload_Internship_Report !== null
      ) {

        filesToUpload.push(formData.Upload_Completion_Certificate);
        filesToUpload.push(formData.Upload_Internship_Report);

        const uploadResults = await handleFileUpload(filesToUpload);

        const updatedUploadedFilePaths = { ...uploadedFilePaths};

        uploadResults.forEach((result) => {
          updatedUploadedFilePaths[result.columnName] = result.filePath;
        });

        setUploadedFilePaths(updatedUploadedFilePaths);

        const formDataWithFilePath = {
          ...formData,
          ...updatedUploadedFilePaths,
        };

        console.log("Final data = ", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      const res = await axios.post(addRecordsInternship, formDataWithFilePath);
      console.log("res = ", res);


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

      navigate("/s/data");
    } catch (error) {
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
          Student Internship Details
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                id="Department"
                size="lg"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Department", value },
                  })
                }
                required
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
                id="Academic_Year"
                value={formData.Academic_Year}
                label="Academic Year"
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Academic_Year", value },
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
                Student Name
              </Typography>
              <Input
                id="Student_Name"
                size="lg"
                label="Student Name"
                value={formData.Student_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Roll No
              </Typography>
              <Input
                id="Roll_No"
                size="lg"
                type="number"
                label="Roll No"
                value={formData.Roll_No}
                onChange={handleOnChange}
              />
              {errors.Roll_No && <p className="text-red-500 text-sm">{errors.Roll_No}</p>}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mobile No
              </Typography>
              <Input
                id="Mobile_No"
                size="lg"
                label="Mobile No"
                value={formData.Mobile_No}
                onChange={handleOnChange}
              />
              {errors.Mobile_No && <p className="text-red-500 text-sm">{errors.Mobile_No}</p>}
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Division
              </Typography>
              <Select
                id="Div"
                label="Eg.11"
                size="lg"
                value={formData.Div}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Div", value },
                  })
                }
              >
                {options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Title
              </Typography>
              <Input
                id="Internship_Title"
                size="lg"
                label="Internship Title"
                value={formData.Internship_Title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Organizer
              </Typography>
              <Input
                id="Internship_Organizer"
                size="lg"
                label="Internship Organizer"
                value={formData.Internship_Organizer}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Company Website Address
              </Typography>
              <Input
                id="Internship_Company_Website_Address"
                size="lg"
                label="Internship Company Website Address"
                value={formData.Internship_Company_Website_Address}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Company Address
              </Typography>
              <Input
                id="Company_Address"
                size="lg"
                label="Company Address"
                value={formData.Company_Address}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mode
              </Typography>
              <Select
                id="Mode"
                size="lg"
                label="Select Mode"
                value={formData.Mode}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Mode", value },
                  })
                }
              >
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in Months
              </Typography>
              <Input
                id="Duration"
                size="lg"
                type="number"
                label="Duration"
                value={formData.Duration}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Stipend (Rs)
              </Typography>
              <Input
                id="Stipend"
                size="lg"
                label="Stipend"
                value={formData.Stipend}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of Engineering
              </Typography>
              <Select
                id="Class"
                size="lg"
                label="Class"
                value={formData.Year}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Class", value },
                  })
                }
              >
                <Option value="FE">FE</Option>
                <Option value="SE">SE</Option>
                <Option value="TE">TE</Option>
                <Option value="BE">BE</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internal Mentor Name
              </Typography>
              <Input
                id="Internal_Mentor_Name"
                size="lg"
                label="Internal Mentor Name"
                value={formData.Internal_Mentor_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                External Mentor Name
              </Typography>
              <Input
                id="External_Mentor_Name"
                size="lg"
                label="External Mentor Name"
                value={formData.External_Mentor_Name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                External Mentor Email
              </Typography>
              <Input
                id="External_Mentor_Email"
                size="lg"
                label="External Mentor Email"
                value={formData.External_Mentor_Email}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                External Mentor Mobile
              </Typography>
              <Input
                id="External_Mentor_Mobile"
                size="lg"
                label="External Mentor Mobile"
                value={formData.External_Mentor_Mobile}
                onChange={handleOnChange}
              />
              {errors.External_Mentor_Mobile && <p className="text-red-500 text-sm">{errors.External_Mentor_Mobile}</p>}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Completion Certificate
              </Typography>
              <Input
                id="Upload_Completion_Certificate"
                size="lg"
                label=""
                type="file"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Report
              </Typography>
              <Input
                id="Upload_Internship_Report"
                size="lg"
                type="file"
                label=""
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                PPO Offer
              </Typography>
              <Select
                id="PPO"
                size="lg"
                label="PPO Offer"
                value={isPPO}
                onChange={(value) => setIsPPO(value)}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
            {isPPO === "Yes" && (
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Proof of Evidence
                </Typography>
                <Input
                  id="Upload_PPO_Offer"
                  size="lg"
                  label="Proof of Evidence"
                  type="file"
                  onChange={handleOnChange}
                />
              </div>
            )}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remark
              </Typography>
              <Input
                id="Remark"
                size="lg"
                label="Remark"
                value={formData.Remark}
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
