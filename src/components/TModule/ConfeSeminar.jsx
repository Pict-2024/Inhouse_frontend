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

import { addRecordsConference, uploadRecordsConference } from "./API_Routes";

export default function ConfeSeminar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Activity_Event: "",
    Title: "",
    Level: "",
    Sponsoring_Authority: "",
    No_of_Participants: "",
    Start_Date: null,
    End_Date: null,
    Mode: "",
    List_of_Resource_Persons: "",
    Name_of_the_Coordinators: "",
    Remarks: "",
    Sponsorship_Amount: "",
    Upload_List_of_Students: null,
    Upload_List_of_Students_Outside: null,
    NoOf_PICT_Participants: "",
    NoOf_Non_PICT_Participants: "",
    Upload_Sample_Certificate: null,
    Upload_Evidence: null,
    Upload_Report: null,
  });

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;

    setFormData({
      ...formData,
      [id]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };
  const handleFileUpload = async () => {
    const formDataForUpload = new FormData();
    // Append additional fields required by the server
    formDataForUpload.append("username", currentUser?.Username);
    formDataForUpload.append("role", currentUser?.Role);
    formDataForUpload.append("tableName", "conference_seminar_workshops");
    formDataForUpload.append("columnNames", "Upload_List_of_Students,Upload_List_of_Students_Outside,Upload_Sample_Certificate,Upload_Evidence, Upload_Report");

    // Append files under the 'files' field name as expected by the server
    if (formData.Upload_List_of_Students) {
      formDataForUpload.append("files", formData.Upload_List_of_Students);
    }
    if (formData.Upload_List_of_Students_Outside) {
      formDataForUpload.append("files", formData.Upload_List_of_Students_Outside);
    }
    if (formData.Upload_Sample_Certificate) {
      formDataForUpload.append("files", formData.Upload_Sample_Certificate);
    }
    if (formData.Upload_Evidence) {
      formDataForUpload.append("files", formData.Upload_Evidence);
    }
    if (formData.Upload_Report) {
      formDataForUpload.append("files", formData.Upload_Report);
    }


    try {
      const response = await axios.post(uploadRecordsConference, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response?.data?.uploadResults);
      return response?.data?.uploadResults;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
    }
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.Upload_Amt_Deposited === null || formData.Upload_Link_to_evidence === null
      || formData.Upload_Paper === null) {
      toast.error("Please select a file for upload.", {
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
      if (
        formData.Upload_Report !== null &&
        formData.Upload_Sample_Certificate !== null &&
        formData.Upload_Evidence !== null &&
        formData.Upload_List_of_Students_Outside !== null &&
        formData.Upload_List_of_Students !== null
      ) {
        // console.log("2");
        pathReport = await handleFileUpload(formData.Upload_Report);
        pathCert = await handleFileUpload(formData.Upload_Sample_Certificate);
        pathEvidence = await handleFileUpload(formData.Upload_Evidence);
        pathOutside = await handleFileUpload(formData.Upload_List_of_Students_Outside);
        pathPICT = await handleFileUpload(formData.Upload_List_of_Students);

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
        Upload_Report: pathReport,
        Upload_Sample_Certificate: pathCert,
        Upload_Evidence: pathEvidence,
        Upload_List_of_Students_Outside: pathOutside,
        Upload_List_of_Students: pathPICT,
      };
      if (
        pathReport === "" &&
        pathCert === "" &&
        pathEvidence === "" &&
        pathOutside === "" &&
        pathPICT === ""
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
      await axios.post(addRecordsConference, formDataWithFilePath);

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
          Conferences, Seminars, Workshops, FDP, STTP Organized /conducted
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
              >
                <Option value="CS">CS</Option>
                <Option value="IT">IT</Option>
                <Option value="EnTC">EnTC</Option>
                <Option value="FE">FE</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Activity
              </Typography>
              <Select
                id="Activity_Event"
                value={formData.Activity_Event}
                color="blueGray"
                size="lg"
                label="Select an activity"
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Activity_Event", value },
                  })
                }
              >
                <Option value="Conference">Conference</Option>
                <Option value="Seminar">Seminar</Option>
                <Option value="Webinar">Webinar</Option>
                <Option value="STTP">STTP</Option>
                <Option value="FDP">FDP</Option>
                <Option value="FOP">FOP</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title
              </Typography>
              <Input
                id="Title"
                size="lg"
                label="Title"
                value={formData.Title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
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
                    target: {
                      id: "Level",
                      value,
                    },
                  })
                }
              // onChange={handleOnChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State">State</Option>
                <Option value="University">University</Option>
                <Option value="Department">Department</Option>
                <Option value="College">College</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsoring Authority
              </Typography>
              <Input
                id="Sponsoring_Authority"
                size="lg"
                label="Sponsoring Authority"
                value={formData.Sponsoring_Authority}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Participants
              </Typography>
              <Input
                id="No_of_Participants"
                size="lg"
                label="No. of Participants"
                type="number"
                value={formData.No_of_Participants}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date(DD-MM-YYYY)
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
                End Date(DD-MM-YYYY)
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of Resource Persons
              </Typography>
              <Input
                id="List_of_Resource_Persons"
                size="lg"
                label="List of Resource Persons"
                value={formData.List_of_Resource_Persons}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mode
              </Typography>
              <Select
                id="Mode"
                size="lg"
                label="Select mode"
                value={formData.Mode}
                onChange={(value) =>
                  handleOnChange({
                    target: {
                      id: "Mode",
                      value,
                    },
                  })
                }
              >
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Coordinator(s)
              </Typography>
              <Input
                id="Name_of_the_Coordinators"
                size="lg"
                label="Name of the Coordinator(s)"
                value={formData.Name_of_the_Coordinators}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
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

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsorship Amount
              </Typography>
              <Input
                id="Sponsorship_Amount"
                size="lg"
                label="Sponsorship Amount"
                value={formData.Sponsorship_Amount}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Evidence of sponsor amount (Only Pdf)
              </Typography>
              <Input
                id="Upload_Evidence"
                size="lg"
                type="file"
                label="Evidence of sponsor amount"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Participants from PICT
              </Typography>
              <Input
                id="NoOf_PICT_Participants"
                size="lg"
                label="Number of Participants from PICT"
                type="number"
                value={formData.NoOf_PICT_Participants}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of no of students from PICT (Only Pdf)
              </Typography>
              <Input
                id="Upload_List_of_Students"
                size="lg"
                type="file"
                label=" List of no of students"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Participants from outside PICT
              </Typography>
              <Input
                id="NoOf_Non_PICT_Participants"
                size="lg"
                label="Number of Participants from outside PICT"
                type="number"
                value={formData.NoOf_Non_PICT_Participants}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of no of students outside PICT (Only Pdf)
              </Typography>
              <Input
                id="Upload_List_of_Students_Outside"
                size="lg"
                type="file"
                label="List of no of students"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sample Certificate document
              </Typography>
              <Input
                id="Upload_Sample_Certificate"
                size="lg"
                label="Sample Certificate document"
                type="file"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Report (Only Pdf)
              </Typography>
              <Input
                id="Upload_Report"
                size="lg"
                type="file"
                label="Complete Report"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <Button className="mt-4" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
