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

import { addRecordsCertificate } from "./API_Routes";


export default function CertificateCourses() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    UserName: currentUser?.UserName,
    Department: "",
    Additional_Certificate_Programs: "",
    Year_of_offering: "",
    No_of_times_offered: "",
    Duration_of_course: "",
    Start_Date: "",
    End_Date: "",
    Students_enrolled: "",
    Students_Completing_the_Course: "",
    Name_of_speakers: "",
    Speaker_details: "",
    Upload_Report: "",
    PSOs_Attained: "",
    Fund_Generated: "",
    Sponsorship_collaboration: "",
  });

  const handleOnChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "number" ? parseFloat(value) : value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsCertificate, formData);

    toast.success('Record Added Successfully', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigate("/t/data");
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
                Year of Offering
              </Typography>
              <Input
                id="Year_of_offering"
                size="lg"
                label="Year of Offering"
                type="number"
                value={formData.Year_of_offering}
                onChange={handleOnChange}
              />
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
                Duration of Course
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
              id="Name_of_speakers"
              size="lg"
              label="Names of Speakers"
              value={formData.Name_of_speakers}
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

          <Button type="submit" className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
