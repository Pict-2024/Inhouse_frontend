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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsConsultancy, uploadRecordsConsultancy } from "./API_Routes";

export default function ConsultancyReport() {
  const { currentUser } = useSelector((state) => state.user);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Name_of_Department: "",
    Role: "",
    Client_Organisation: "",
    Chief_Consultant: "",
    Title_of_Work_domain: "",
    Type_Paid_Unpaid: "",
    Amount: "",
    Start_Date: null,
    End_Date: null,
    Upload_Amt_Deposited: null,
    AmountCollege: "",
    Date_of_Transaction: null,
    Upload_Link_to_evidence: null,
    Status: "",
    Outcome: "",
    Upload_Paper: null,
  });

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
      queryParams.append("tableName", "consultancy_report");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_Amt_Deposited) {
        formDataForUpload.append("files", formData.Upload_Amt_Deposited);
        columnNames.push("Upload_Amt_Deposited");
      }
      if (formData.Upload_Link_to_evidence) {
        formDataForUpload.append("files", formData.Upload_Link_to_evidence);
        columnNames.push("Upload_Link_to_evidence");
      }
      if (formData.Upload_Paper) {
        formDataForUpload.append("files", formData.Upload_Paper);
        columnNames.push("Upload_Paper");
      }


      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsConsultancy}?${queryParams.toString()}`;
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

  //Add new records
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.Upload_Amt_Deposited === null || formData.Upload_Link_to_evidence === null
      || formData.Upload_Paper === null) {
      toast.error("Select a file for upload.", {
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

      if (formData.Upload_Amt_Deposited !== null) {
        filesToUpload.push(formData.Upload_Amt_Deposited);
      }
      if (formData.Upload_Link_to_evidence !== null) {
        filesToUpload.push(formData.Upload_Link_to_evidence);
      }
      if (formData.Upload_Paper !== null) {
        filesToUpload.push(formData.Upload_Paper);
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
      await axios.post(addRecordsConsultancy, formDataWithFilePath);

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
          Consultancy Report
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Department
              </Typography>
              <Select
                name="Name_of_Department"
                size="lg"
                label="Department"
                value={formData.Name_of_Department}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Name_of_Department", value },
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
                Role
              </Typography>
              <Input
                size="lg"
                name="Role"
                type="text"
                value={formData.Role}
                label="Role"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Client Organisation
              </Typography>
              <Input
                size="lg"
                type="text"
                name="Client_Organisation"
                value={formData.Client_Organisation}
                label="Client Organisation"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Chief Consultant
              </Typography>
              <Input
                size="lg"
                name="Chief_Consultant"
                type="text"
                value={formData.Chief_Consultant}
                label="Chief Consultant"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Work domain
              </Typography>
              <Input
                size="lg"
                name="Title_of_Work_domain"
                type="text"
                value={formData.Title_of_Work_domain}
                label="Title of Work domain"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type
              </Typography>
              <Select
                size="lg"
                name="Type_Paid_Unpaid"
                value={formData.Type_Paid_Unpaid}
                label="Select Type"
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({ target: { name: "Type_Paid_Unpaid", value } })
                }
              >
                <Option value="Paid">Paid</Option>
                <Option value="Unpaid">Unpaid</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount
              </Typography>
              <Input
                size="lg"
                name="Amount"
                type="number"
                value={formData.Amount}
                label="Amount"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status
              </Typography>
              <Select
                size="lg"
                name="Status"
                value={formData.Status}
                label="Select Type"
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({ target: { name: "States", value } })
                }
              >
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </div>

          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date
              </Typography>
              <Input
                size="lg"
                name="Start_Date"
                value={formData.Start_Date}
                type="date"
                label="Start Date"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date
              </Typography>
              <Input
                size="lg"
                name="End_Date"
                value={formData.End_Date}
                type="date"
                label="End Date"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount Deposited to college account
              </Typography>
              <Input
                size="lg"
                name="AmountCollege"
                type="number"
                value={formData.AmountCollege}
                label="Amount Deposited to college account"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of Transaction
              </Typography>
              <Input
                size="lg"
                name="Date_of_Transaction"
                value={formData.Date_of_Transaction}
                type="date"
                label="Date of Transaction"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Document evidence for amount deposited in PICT account (bank
                statement) (Only Pdf)
              </Typography>
              <Input
                size="lg"
                name="Upload_Amt_Deposited"
                type="file"
                onChange={handleChange}
                label="Document evidence for amount deposited in PICT account"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Document evidence for amount sanctioned from funding agency (for
                current A.Y.) (Only Pdf)
              </Typography>
              <Input
                size="lg"
                name="Upload_Link_to_evidence"
                type="file"
                onChange={handleChange}
                label=" Document evidence for amount sanctioned "
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Outcome
              </Typography>
              <Input
                size="lg"
                name="Outcome"
                type="text"
                value={formData.Outcome}
                label="Outcome"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload All Documents in PDF related to Consulting
              </Typography>
              <Input
                size="lg"
                type="file"
                name="Upload_Paper"
                label="Upload PDF Documents"
                onChange={handleChange}
              />
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
