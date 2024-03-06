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

import { addRecordsGrants, uploadRecordsGrants } from "./API_Routes";

export default function Grants() {
  const { currentUser } = useSelector((state) => state.user);
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
    Department: "",
    Principal_Investigator_Faculty_Name: "",
    Project_Title: "",
    Names_of_CO_PI: "",
    Number_of_CO_PI: "",
    Department_of_CO_PI: "",
    Project_Type_Government_Non_Government: "",
    Name_of_Funding_Agency: "",
    Name_of_the_Scheme: "",
    Amount_Sanctioned: "",
    Evidence_Document: null,
    Year_of_grant_received: "",
    Start_Date: "",
    End_Date: "",
    Amount_deposited_to_PICT_account: null,
    Transaction_date: "",
    Status_Ongoing_Completed: "",
    Duration: "",
    Outcome: "",
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
      formDataForFile.append("tableName", "grants");
      formDataForFile.append("columnName", [
        "Evidence_Document",
        "Amount_deposited_to_PICT_account",
      ]);

      const response = await axios.post(uploadRecordsGrants, formDataForFile);
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

    let pathEvidence, pathReport;

    try {
      if (
        formData.Amount_deposited_to_PICT_account !== null &&
        formData.Evidence_Document !== null
      ) {
        pathReport = await handleFileUpload(
          formData.Amount_deposited_to_PICT_account
        );
        pathEvidence = await handleFileUpload(formData.Evidence_Document);

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

        Evidence_Document: pathEvidence,
        Amount_deposited_to_PICT_account: pathReport,
      };
      if (pathEvidence === "" || pathReport === "") {
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
      await axios.post(addRecordsGrants, formDataWithFilePath);

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
          Grants
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                name="Department"
                size="lg"
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
                Principal Investigator Faculty Name
              </Typography>
              <Input
                size="lg"
                type="text"
                name="Principal_Investigator_Faculty_Name"
                value={formData.Principal_Investigator_Faculty_Name}
                onChange={handleChange}
                label="Principal Investigator Faculty Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Project Title
              </Typography>
              <Input
                size="lg"
                name="Project_Title"
                type="text"
                value={formData.Project_Title}
                onChange={handleChange}
                label="Project Title"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full  px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Names of CO-PI
              </Typography>
              <Input
                size="lg"
                name="Names_of_CO_PI"
                type="text"
                value={formData.Names_of_CO_PI}
                onChange={handleChange}
                label="Name(s) of CO-PI for multiple values use comma separated names"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department of CO-PI
              </Typography>
              <Input
                size="lg"
                name="Department_of_CO_PI"
                type="text"
                value={formData.Department_of_CO_PI}
                onChange={handleChange}
                label="Department of CO-PI"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Project Type
              </Typography>
              <Select
                size="lg"
                name="Project_Type_Government_Non_Government"
                value={formData.Project_Type_Government_Non_Government}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Project_Type_Government_Non_Government",
                      value,
                    },
                  })
                }
                // onChange={handleChange}
                label="Select Project Type"
              >
                <Option value="Government">Government</Option>
                <Option value="Non Government">Non Government</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Funding Agency
              </Typography>
              <Input
                size="lg"
                name="Name_of_Funding_Agency"
                type="text"
                value={formData.Name_of_Funding_Agency}
                onChange={handleChange}
                label="Name of Funding Agency"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Scheme
              </Typography>
              <Input
                size="lg"
                name="Name_of_the_Scheme"
                type="text"
                value={formData.Name_of_the_Scheme}
                onChange={handleChange}
                label="Name of the Scheme"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount deposited to PICT account in current year
              </Typography>
              <Input
                size="lg"
                name="Amount_Sanctioned"
                type="number"
                value={formData.Amount_Sanctioned}
                onChange={handleChange}
                label="Amount deposited to PICT account in current year"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of grant received
              </Typography>
              <Select
                size="lg"
                name="Year_of_grant_received"
                value={formData.Year_of_grant_received}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Year_of_grant_received",
                      value,
                    },
                  })
                }
                // onChange={handleChange}
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
                onChange={handleChange}
                type="date"
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
                onChange={handleChange}
                type="date"
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
                name="Amount_deposited_to_PICT_account"
                type="file"
                onChange={handleChange}
                label="Amount deposited to PICT account"
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
                name="Evidence_Document"
                type="file"
                onChange={handleChange}
                label="Document evidence for amount deposited in PICT account"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Transaction date
              </Typography>
              <Input
                size="lg"
                name="Transaction_date"
                label="Transaction date"
                value={formData.Transaction_date}
                onChange={handleChange}
                type="date"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status
              </Typography>
              <Select
                size="lg"
                name="Status_Ongoing_Completed"
                value={formData.Status_Ongoing_Completed}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Status_Ongoing_Completed", value },
                  })
                }
                // onChange={handleChange}
                label="Select Status"
              >
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in months
              </Typography>
              <Input
                size="lg"
                name="Duration"
                type="number"
                value={formData.Duration}
                onChange={handleChange}
                label="Duration"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Outcome
              </Typography>
              <Input
                size="lg"
                name="Outcome"
                type="text"
                value={formData.Outcome}
                onChange={handleChange}
                label="Outcome"
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
