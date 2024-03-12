import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Option,
  Select,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsCertificate, uploadRecordsCertificate } from "./API_Routes";

export default function CertificateCourses() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    UserName: currentUser?.Username,
    Department: "",
    Additional_Certificate_Programs: "",
    Year_of_offering: null,
    No_of_times_offered: "",
    Duration_of_course: "",
    Start_Date: null,
    End_Date: null,
    Students_enrolled: "",
    Students_Completing_the_Course: "",
    Names_of_speakers: "",
    Speaker_details: "",
    Upload_Report: "",
    PSOs_Attained: "",
    Fund_Generated: "",
    Sponsorship_collaboration: "",
    Sample_Certificate: null,
    Report: null,
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

  const handleFileUpload = async (file) => {
    try {
      // console.log("file as:", file);

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "certificate_courses");
      formDataForFile.append("columnName", ["Sample_Certificate", "Report"]);

      const response = await axios.post(
        uploadRecordsCertificate,
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

    var pathReport, pathStudent;
    // console.log(formData.Sample_Certificate);
    try {
      if (formData.Report !== null && formData.Sample_Certificate !== null) {
        // console.log("2");
        pathReport = await handleFileUpload(formData.Report);
        // console.log("3");
        pathStudent = await handleFileUpload(formData.Sample_Certificate);
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

        Report: pathReport,
        Sample_Certificate: pathStudent,
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
      await axios.post(addRecordsCertificate, formDataWithFilePath);

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
          Certificate Courses
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                size="lg"
                id="Department"
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
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Add-On / Certificate Program
              </Typography>
              <Input
                id="Additional_Certificate_Programs"
                size="lg"
                label="Name of Add-On / Certificate Program"
                value={formData.Additional_Certificate_Programs}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Academic Year
              </Typography>
              <Select
                id="Year_of_offering"
                size="lg"
                label="Academic Year"
                value={formData.Year_of_offering}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Year_of_offering", value },
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
                No. of Times Offered During the Same Year
              </Typography>
              <Input
                id="No_of_times_offered"
                size="lg"
                label="No. of Times Offered During the Same Year"
                type="number"
                value={formData.No_of_times_offered}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration of Course (in Hours)
              </Typography>
              <Input
                id="Duration_of_course"
                size="lg"
                label="Duration of Course"
                value={formData.Duration_of_course}
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Students Enrolled in the Year
              </Typography>
              <Input
                id="Students_enrolled"
                size="lg"
                label="Number of Students Enrolled in the Year"
                type="number"
                value={formData.Students_enrolled}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Students Completing the Course in the Year
              </Typography>
              <Input
                id="Students_Completing_the_Course"
                size="lg"
                label="Number of Students Completing the Course in the Year"
                type="number"
                value={formData.Students_Completing_the_Course}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Names of Speakers
            </Typography>
            <Input
              id="Names_of_speakers"
              size="lg"
              label="Names of Speakers"
              value={formData.Names_of_speakers}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Speaker Details
            </Typography>
            <Input
              id="Speaker_details"
              size="lg"
              label="Speaker Details"
              value={formData.Speaker_details}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Link to Report Consisting of Geotagged Photograph, Feedback,
              Attendance
            </Typography>
            <Input
              id="Upload_Report"
              size="lg"
              label="Link to Report Consisting of Geotagged Photograph, Feedback, Attendance"
              value={formData.Upload_Report}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Program Specific Outcomes (PSOs) Attained Through This Course
            </Typography>
            <Input
              id="PSOs_Attained"
              size="lg"
              label="Program Specific Outcomes (PSOs) Attained Through This Course"
              value={formData.PSOs_Attained}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Fund Generated
              </Typography>
              <Input
                id="Fund_Generated"
                size="lg"
                label="Fund Generated"
                value={formData.Fund_Generated}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsorship/Collaboration
              </Typography>
              <Input
                id="Sponsorship_collaboration"
                size="lg"
                label="Sponsorship/Collaboration"
                value={formData.Sponsorship_collaboration}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Final Report (Only Pdf)
              </Typography>
              <Input
                id="Report"
                size="lg"
                label="Final Report"
                type="file"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Sample Certificate (Only Pdf)
              </Typography>
              <Input
                id="Sample_Certificate"
                size="lg"
                type="file"
                label="Sample Certificate"
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
