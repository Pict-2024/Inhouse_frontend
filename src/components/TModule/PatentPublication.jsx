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

import { addRecordsPatent, uploadRecordsPatent } from "./API_Routes";

export default function PatentPublication() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Name_of_the_Department: "",
    Patent_Application_No: "",
    Status_of_Patent_Pub: "",
    Inventor_Name: "",
    Title_of_the_Patent: "",
    Co_Inventors_Name: "",
    Patent_Filed_Date: "",
    Patent_Pub_Date: "",
    Patent_Granted_Date: "",
    Patent_Pub_Number: "",
    Institute_Affiliation: "",
    Finance_Support_By_PICT: "",
    Evidence: null,
    URL_Web_Links: "",
    Type_of_the_Patent: "",
    Approval_Letter: null,
    Country: "",
    Upload_Patent_Document: null,
    Upload_Patent_Grant: null,
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
      formDataForFile.append("tableName", "patent_publication");
      formDataForFile.append("columnName", [
        "Evidence",
        "Approval_Letter",
        "Upload_Patent_Document",
        "Upload_Patent_Grant",
      ]);

      const response = await axios.post(uploadRecordsPatent, formDataForFile);
      console.log(response);
      // console.log("file response:", response.data.filePath);

      return response.data.filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
    }
  };

  // Add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    var pathEvidence = null,
      pathReport,
      pathDoc,
      pathGrant;
    console.log(isFinancialSupport);
    console.log(formData.Evidence);
    // Check if evidence upload is required
    if (isFinancialSupport && formData.Evidence === null) {
      alert("Upload Evidence document");
      return;
    }

    try {
      if (isFinancialSupport) {
        pathEvidence = await handleFileUpload(formData.Evidence);
      }
      if (
        formData.Approval_Letter !== null &&
        formData.Upload_Patent_Document !== null &&
        formData.Upload_Patent_Grant !== null
      ) {
        pathReport = await handleFileUpload(formData.Approval_Letter);
        pathDoc = await handleFileUpload(formData.Upload_Patent_Document);
        pathGrant = await handleFileUpload(formData.Upload_Patent_Grant);

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
        Approval_Letter: pathReport,
        Upload_Patent_Document: pathDoc,
        Upload_Patent_Grant: pathGrant,
      };
      if (
        pathEvidence === "" ||
        pathReport === "" ||
        pathDoc === "" ||
        pathGrant === ""
      ) {
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
      await axios.post(addRecordsPatent, formDataWithFilePath);

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
          Patent Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Department
              </Typography>
              <Select
                name="Name_of_the_Department"
                size="lg"
                label="Department"
                value={formData.Name_of_the_Department}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Name_of_the_Department", value },
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
                Patent Application No.
              </Typography>
              <Input
                size="lg"
                name="Patent_Application_No"
                type="text"
                value={formData.Patent_Application_No}
                onChange={handleChange}
                label="Patent Application No."
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status of Patent
              </Typography>
              <Select
                name="Status_of_Patent_Pub"
                size="lg"
                label="Status"
                value={formData.Status_of_Patent_Pub}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Status_of_Patent_Pub", value },
                  })
                }
              >
                <Option value="Published">Published</Option>
                <Option value="Granted">Granted</Option>
                <Option value="Filed">Filed</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Inventors Name
              </Typography>
              <Input
                size="lg"
                name="Inventor_Name"
                type="text"
                value={formData.Inventor_Name}
                onChange={handleChange}
                label="Inventor's Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the Patent
              </Typography>
              <Input
                size="lg"
                name="Title_of_the_Patent"
                type="text"
                value={formData.Title_of_the_Patent}
                onChange={handleChange}
                label="Title of the Patent"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co-Inventors name
              </Typography>
              <Input
                size="lg"
                name="Co_Inventors_Name"
                value={formData.Co_Inventors_Name}
                onChange={handleChange}
                label="Co-Inventors name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Filed Date
              </Typography>
              <Input
                size="lg"
                name="Patent_Filed_Date"
                value={formData.Patent_Filed_Date}
                onChange={handleChange}
                type="date"
                label="Patent Filed Date (DD/MM/YYYY)"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Published Date
              </Typography>
              <Input
                size="lg"
                name="Patent_Pub_Date"
                value={formData.Patent_Pub_Date}
                onChange={handleChange}
                type="date"
                label="Patent Published Date"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Granted Date
              </Typography>
              <Input
                size="lg"
                name="Patent_Granted_Date"
                value={formData.Patent_Granted_Date}
                onChange={handleChange}
                type="date"
                label="Patent Granted Date"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Publication Number / Patent Granted Number
              </Typography>
              <Input
                size="lg"
                name="Patent_Pub_Number"
                type="text"
                value={formData.Patent_Pub_Number}
                onChange={handleChange}
                label="Patent Publication Number / Patent Granted Number"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Institute Affiliation at the time of Application
              </Typography>
              <Input
                size="lg"
                type="text"
                name="Institute_Affiliation"
                value={formData.Institute_Affiliation || "PICT"}
                onChange={handleChange}
                label="Institute Affiliation"
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Source Proof URL/Website Links, etc.
              </Typography>
              <Input
                size="lg"
                name="URL_Web_Links"
                value={formData.URL_Web_Links}
                onChange={handleChange}
                label="Source Proof URL/Website Links, etc."
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type of the Patent
              </Typography>
              <Input
                size="lg"
                name="Type_of_the_Patent"
                value={formData.Type_of_the_Patent}
                onChange={handleChange}
                label="Type of the Patent"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Approval Letter for financial Support
              </Typography>
              <Input
                size="lg"
                name="Approval_Letter"
                type="file"
                onChange={handleChange}
                label="Approval Letter for financial Support"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Country
              </Typography>
              <Input
                size="lg"
                name="Country"
                type="text"
                value={formData.Country}
                onChange={handleChange}
                label="Country"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Patent Publication document
              </Typography>
              <Input
                size="lg"
                name="Upload_Patent_Document"
                onChange={handleChange}
                type="file"
                label="Upload Patent Document"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Patent grant document
              </Typography>
              <Input
                size="lg"
                name="Upload_Patent_Grant"
                onChange={handleChange}
                type="file"
                label="Upload Patent grant document"
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            submit
          </Button>
        </form>
      </Card>
    </>
  );
}
