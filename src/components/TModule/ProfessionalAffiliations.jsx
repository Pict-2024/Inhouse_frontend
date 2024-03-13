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
  addRecordsProfessional,
  uploadRecordsProfessional,
} from "./API_Routes";

export default function ProfessionalAffiliations() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Professional_Affiliation: "",
    Membership_Number_ID: "",
    Finance_Support_By_PICT: "",
    Upload_Membership_Evidence: null,
    Upload_Evidence: null,
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
      formDataForFile.append("tableName", "professional_affiliation");
      formDataForFile.append("columnName", ["Upload_Membership_Evidence", "Upload_Evidence"]);

      const response = await axios.post(
        uploadRecordsProfessional,
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

    var pathReport, pathStudent =null;
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }
    // console.log(formData.Evidence);
    try {
      if (isFinancialSupport) {
        // console.log("hi");
        // Handle evidence upload only if financial support is selected
        pathStudent = await handleFileUpload(formData.Upload_Evidence);
      }
      if (formData.Upload_Membership_Evidence !== null) {
        // console.log("2");
        pathReport = await handleFileUpload(formData.Upload_Membership_Evidence);
      
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

        Upload_Membership_Evidence: pathReport,
        Upload_Evidence: pathStudent,
      };
      if (pathReport === "" && pathStudent === "") {
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
      await axios.post(addRecordsProfessional, formDataWithFilePath);

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
          Professional Affiliations
        </Typography>

        <div className="mb-4 flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Professional Affiliation
            </Typography>
            <Select
              size="lg"
              name="Professional_Affiliation"
              value={formData.Professional_Affiliation}
              label="Select Affiliation"
              onChange={(value) =>
                handleChange({
                  target: { name: "Professional_Affiliation", value },
                })
              }
            >
              <Option value="IEEE">IEEE</Option>
              <Option value="CSI">CSI</Option>
              <Option value="ACM">ACM</Option>
              <Option value="ITE">ITE</Option>
              <Option value="ISTE">ISTE</Option>
            </Select>
          </div>
        </div>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Membership Number/ID
              </Typography>
              <Input
                size="lg"
                name="Membership_Number_ID"
                value={formData.Membership_Number_ID}
                type="text"
                label="Membership Number/ID"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Membership Evidence document
              </Typography>
              <Input
                size="lg"
                name="Upload_Membership_Evidence"
                type="file"
                label="Membership Evidence"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4 ">
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40 ">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Financial support from institute in INR
                </Typography>
                <div className="flex gap-3 ">
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
                <div className="w-full md:w-1/2 px-4 mb-4 flex gap-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    name="Upload_Evidence"
                    type="file"
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button className="mt-4" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
