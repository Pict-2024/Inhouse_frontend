import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
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
  const [isPatentPublished, setIsPatentPublished] = useState(false);
  const [isPatentGranted, setIsPatentGranted] = useState(false);
  const [isApprovalLetter, setIsApprovalLetter] = useState(false);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Name_of_the_Department: "",
    Patent_Application_No: "",
    Status_of_Patent_Pub: "",
    Summary: "",
    Inventor_Name: "",
    Title_of_the_Patent: "",
    Co_Inventors_Name: "",
    Patent_Filed_Date: null,
    Patent_Pub_Date: null,
    Patent_Granted_Date: null,
    Patent_Pub_Number: "",
    Institute_Affiliation: "",
    Finance_Support_By_PICT: "",
    Upload_Evidence: null,
    URL_Web_Links: "",
    Type_of_the_Patent: "",
    Upload_Approval_Letter: null,
    Country: "",
    Upload_Patent_Document: null,
    Upload_Patent_Grant: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "Status_of_Patent_Pub") {
      if (value === "Granted") {
        setShowSummary(true);
      } else {
        setShowSummary(false);
      }
    }

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (files) => {
    try {

      if (files.length === 0) {
        // Handle the scenario where no files are provided
        console.warn("No files to upload");
        return []; // Return an empty array or appropriate response
      }
      const queryParams = new URLSearchParams();
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "patent_publication");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_Approval_Letter) {
        formDataForUpload.append("files", formData.Upload_Approval_Letter);
        columnNames.push("Upload_Approval_Letter");
      }
      if (formData.Upload_Evidence) {
        formDataForUpload.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence");
      }
      if (formData.Upload_Patent_Document) {
        formDataForUpload.append("files", formData.Upload_Patent_Document);
        columnNames.push("Upload_Patent_Document");
      }
      if (formData.Upload_Patent_Grant) {
        formDataForUpload.append("files", formData.Upload_Patent_Grant);
        columnNames.push("Upload_Patent_Grant");
      }


      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsPatent}?${queryParams.toString()}`;
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

  // Add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

   
    if(isPatentGranted && formData.Upload_Patent_Grant === null) {
      alert("Upload Patent Grant Document");
      return;
    }
    if(isPatentPublished && formData.Upload_Patent_Document === null) {
      alert("Upload Patent Published Document");
      return;
    }
    if (isApprovalLetter && formData.Upload_Approval_Letter === null) {
      alert("Upload Approval Letter");
      return;
    }
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }

    try {
      const filesToUpload = [];
      if (isFinancialSupport && formData.Upload_Evidence) {
        filesToUpload.push(formData.Upload_Evidence);
      }
      if (isApprovalLetter && formData.Upload_Approval_Letter) {
        filesToUpload.push(formData.Upload_Approval_Letter);
      }
      if (isPatentPublished && formData.Upload_Patent_Document) {
        filesToUpload.push(formData.Upload_Patent_Document);
      }
      if (isPatentGranted && formData.Upload_Patent_Grant) {
        filesToUpload.push(formData.Upload_Patent_Grant);
      }

      console.log("Files: ",filesToUpload);
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
          {showSummary &&
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full  px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Patent Summary
                </Typography>
                <Textarea
                  size="lg"
                  name="Summary"
                  type="text"
                  value={formData.Summary}
                  onChange={handleChange}
                  label="Patent Summary"
                />
              </div>
            </div>}
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
                label="Patent Publication No / Patent Granted No"
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
                    name="Upload_Evidence"
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
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Approval Letter for financial Support (Only Pdf)
                </Typography>
                <div className="flex gap-3">
                  <label className="mx-2">
                    <input
                      type="radio"
                      name="approvalLetter"
                      value="yes"
                      checked={isApprovalLetter}
                      onChange={() => setIsApprovalLetter(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="approvalLetter"
                      value="no"
                      checked={!isApprovalLetter}
                      onChange={() => setIsApprovalLetter(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full px-4 mb-4">
                  <Input
                    size="lg"
                    name="Upload_Approval_Letter"
                    type="file"
                    onChange={handleChange}
                    label="Approval Letter for financial Support"
                    disabled={!isApprovalLetter}
                  />
                </div>
              </div>
            </div>
            <div className="w-full  px-4 mb-4">
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
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Patent Publication document (Only Pdf)
                </Typography>
                <div className="flex gap-3">
                  <label className="mx-2">
                    <input
                      type="radio"
                      name="patentPublication"
                      value="yes"
                      checked={isPatentPublished}
                      onChange={() => setIsPatentPublished(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="patentPublication"
                      value="no"
                      checked={!isPatentPublished}
                      onChange={() => setIsPatentPublished(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full px-4 mb-4">
                  <Input
                    size="lg"
                    name="Upload_Patent_Document"
                    onChange={handleChange}
                    type="file"
                    label="Upload Patent Document"
                    disabled={!isPatentPublished}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Patent grant document (Only Pdf)
                </Typography>
                <div className="flex gap-3">
                  <label className="mx-2">
                    <input
                      type="radio"
                      name="patentGranted"
                      value="yes"
                      checked={isPatentGranted}
                      onChange={() => setIsPatentGranted(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="patentGranted"
                      value="no"
                      checked={!isPatentGranted}
                      onChange={() => setIsPatentGranted(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full px-4 mb-4">
                  <Input
                    size="lg"
                    name="Upload_Patent_Grant"
                    onChange={handleChange}
                    type="file"
                    label="Upload Patent grant document"
                    disabled={!isPatentGranted}
                  />
                </div>
              </div>
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
