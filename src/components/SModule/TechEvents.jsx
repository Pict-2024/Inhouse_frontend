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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addRecordsTechnicalStud,
  uploadRecordsTechincalStud,
} from "./API_Routes";

export default function TechEvents() {
  const navigate = useNavigate();
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: null,
    Email_ID: currentUser?.Username,
    Mobile_No: "",
    Department: "",
    Class: "",
    Role: "",
    Technical_Event_Name: "",
    Name_of_Sub_Event: "",
    Event_Type: "",
    Activity_Type: "",
    Role_of_Individual_in_Event: "",
    Organizer_Name: "",
    Level: "",
    Model: "",
    Place: "",
    Start_Date: "",
    End_Date: "",
    Financial_support_given_by_Institute_in_INR: "",
    Award: "",
    Award_Prize_Money: "",
    Remarks: "",
    Geo_Tag_Photos: "",
    Upload_Certificate: null,
    Upload_Evidence: null,
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

    setFormData({
      ...formData,
      [id]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };
  const handleFileUpload = async (files) => {

    console.log("file as:", files);
    try {

      const queryParams = new URLSearchParams();

      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "student_technical_events");

      const formDataForFile = new FormData();
      const columnNames = [];
      if (formData.Upload_Certificate) {
        formDataForFile.append("files", formData.Upload_Certificate);
        columnNames.push("Upload_Certificate");
      }
      if (formData.Upload_Evidence) {
        formDataForFile.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence");
      }

      queryParams.append("columnNames", columnNames.join(","));
      console.log("query = ", queryParams);

      const url = `${uploadRecordsTechincalStud}?${queryParams.toString()}`;
      console.log("formdata = ", formData);

      const response = await axios.post(url, formDataForFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data);
      return response?.data?.uploadResults;

    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 1500,
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
    e.preventDefault();
    console.log(formData);


    // Check if evidence upload is required
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }

    try {

      const filesToUpload = [];

      if (isFinancialSupport) {
        filesToUpload.push(formData.Upload_Evidence);
      }
      if (formData.Upload_Certificate !== null) {
        filesToUpload.push(formData.Upload_Certificate);
      }
      else {
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

      const uploadResults = await handleFileUpload(filesToUpload);

      const updatedUploadedFilePaths = { ...uploadedFilePaths };

      uploadResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });

      setUploadedFilePaths(updatedUploadedFilePaths);

      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };

      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsTechnicalStud, formDataWithFilePath);

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
      navigate("/s/data");
    } catch (error) {
      // Handle file upload error
      // console.error("File upload error:", error);

      // Display an error toast
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 1500,
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
          Technical Events
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
                required
                value={formData.Department}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Department", value },
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
                Year of Study
              </Typography>
              <Select
                id="Class"
                size="lg"
                label="Class"
                value={formData.Class}
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
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Technical Event Name
              </Typography>
              <Input
                id="Technical_Event_Name"
                size="lg"
                label="Technical_Event_Name "
                value={formData.Technical_Event_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Participant or Organizer
              </Typography>
              <Input
                id="Role"
                size="lg"
                label="Role as Participant or Organizer"
                value={formData.Role}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mobile no
              </Typography>
              <Input
                id="Mobile_No"
                size="lg"
                label="Mobile No"
                value={formData.Mobile_No}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Individual Role
              </Typography>
              <Input
                id="Role_of_Individual_in_Event"
                size="lg"
                label="Individual Role"
                value={formData.Role_of_Individual_in_Event}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sub Event Name
              </Typography>
              <Input
                id="Name_of_Sub_Event"
                size="lg"
                label="Sub Event Name"
                value={formData.Name_of_Sub_Event}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Event Type
              </Typography>
              <Input
                id="Event_Type"
                size="lg"
                label="Event Type"
                value={formData.Event_Type}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Activity Type
              </Typography>
              <Select
                id="Activity_Type"
                size="lg"
                label="Activity Type"
                value={formData.Activity_Type}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Activity_Type", value },
                  })
                }
              >
                <Option value="Team">Teamwork</Option>
                <Option value="Individual">Individual</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Organizer Name
              </Typography>
              <Input
                id="Organizer_Name"
                size="lg"
                label="Organizer_Name"
                value={formData.Organizer_Name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                id="Level"
                size="lg"
                label="Select Level"
                value={formData.Level}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Level", value },
                  })
                }
              >
                <Option value="National">National</Option>
                <Option value="International">International</Option>
                <Option value="University">University</Option>
                <Option value="State">Others</Option>
              </Select>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mode
              </Typography>
              <Select
                id="Model"
                size="lg"
                label="Select Mode"
                value={formData.Model}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Model", value },
                  })
                }
              >
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Place
              </Typography>
              <Input
                id="Place"
                size="lg"
                label="Place"
                value={formData.Place}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date
              </Typography>
              <Input
                id="Start_Date"
                size="lg"
                label="Start Date"
                type="date"
                value={formData.Start_Date}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date
              </Typography>
              <Input
                id="End_Date"
                size="lg"
                label="End Date"
                type="date"
                value={formData.End_Date}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="px-4 mb-4 flex justify-start items-center gap-4">
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
              <div className="flex justify-between  flex-col md:flex-row">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Amount in INR"
                    id="Financial_support_given_by_Institute_in_INR"
                    type="number"
                    value={formData.Financial_support_given_by_Institute_in_INR}
                    onChange={handleOnChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    id="Upload_Evidence"
                    type="file"
                    onChange={handleOnChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award
              </Typography>
              <Input
                id="Award"
                size="lg"
                label="Award"
                value={formData.Award}
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award_Prize_Money
              </Typography>
              <Input
                id="Award_Prize_Money"
                size="lg"
                label="Award_Prize_Money"
                value={formData.Award_Prize_Money}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Completion Certificate (Only Pdf)
              </Typography>
              <Input
                id="Upload_Certificate"
                size="lg"
                label=""
                type="file"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Geo Tag Photos
              </Typography>
              <Input
                id="Geo_Tag_Photos"
                size="lg"
                label="Geo Tag Photos"
                value={formData.Geo_Tag_Photos}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full  px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remarks
              </Typography>
              <Input
                id="Remarks"
                size="lg"
                label="Remarks"
                value={formData.Remarks}
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
