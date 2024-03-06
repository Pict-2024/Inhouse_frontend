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
    Start_Date: "",
    End_Date: "",
    Amt_Deposited: null,
    Date_of_Transaction: "",
    Link_to_evidence: null,
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

  const handleFileUpload = async (file) => {
    try {
      console.log("file as:", file);

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "consultancy_report");
      formDataForFile.append("columnName", [
        "Amt_Deposited",
        "Link_to_evidence",
        "Upload_Paper",
      ]);

      const response = await axios.post(
        uploadRecordsConsultancy,
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

  //Add new records
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let pathEvidence, pathReport, pathAmt;

    try {
      if (
        formData.Upload_Paper !== null &&
        formData.Link_to_evidence !== null &&
        formData.Amt_Deposited !== null
      ) {
        pathReport = await handleFileUpload(formData.Upload_Paper);
        pathEvidence = await handleFileUpload(formData.Link_to_evidence);
        pathAmt = await handleFileUpload(formData.Amt_Deposited);

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

        Link_to_evidence: pathEvidence,
        Upload_Paper: pathReport,
        Amt_Deposited: pathAmt,
      };
      if (pathEvidence === "" || pathReport === "" || pathAmt === "") {
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
                name="Amt_Deposited"
                value={formData.Amt_Deposited}
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
                statement)
              </Typography>
              <Input
                size="lg"
                name="Amt_Deposited"
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
                current A.Y.)
              </Typography>
              <Input
                size="lg"
                name="Link_to_evidence"
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
