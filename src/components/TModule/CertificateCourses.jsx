import { useState } from "react";
import { Card, Input, Button, Typography,Option,Select } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { addRecordsCertificate } from "./API_Routes";

export default function CertificateCourses() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    T_ID: null,
    UserName: currentUser?.Email,
    Department: "",
    courseName: "",
    yearOfOffering: "",
    timesOffered: "",
    courseDuration: "",
    startDate: "",
    endDate: "",
    enrolledStudents: "",
    completedStudents: "",
    speakers: "",
    speakerDetails: "",
    reportLink: "",
    psosAttained: "",
    fundGenerated: "",
    sponsorship: "",
  });

  const handleOnChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(addRecordsCertificate, formData);
    console.log("Response is : ", response.data);
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
                id="courseName"
                size="lg"
                label="Name of Add-On / Certificate Program"
                value={formData.courseName}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of Offering
              </Typography>
              <Input
                id="yearOfOffering"
                size="lg"
                label="Year of Offering"
                type="number"
                value={formData.yearOfOffering}
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
                id="timesOffered"
                size="lg"
                label="No. of Times Offered During the Same Year"
                type="number"
                value={formData.timesOffered}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration of Course
              </Typography>
              <Input
                id="courseDuration"
                size="lg"
                label="Duration of Course"
                value={formData.courseDuration}
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
                id="startDate"
                size="lg"
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date
              </Typography>
              <Input
                id="endDate"
                size="lg"
                label="End Date"
                type="date"
                value={formData.endDate}
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
                id="enrolledStudents"
                size="lg"
                label="Number of Students Enrolled in the Year"
                type="number"
                value={formData.enrolledStudents}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Students Completing the Course in the Year
              </Typography>
              <Input
                id="completedStudents"
                size="lg"
                label="Number of Students Completing the Course in the Year"
                type="number"
                value={formData.completedStudents}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Names of Speakers
            </Typography>
            <Input
              id="speakers"
              size="lg"
              label="Names of Speakers"
              value={formData.speakers}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Speaker Details
            </Typography>
            <Input
              id="speakerDetails"
              size="lg"
              label="Speaker Details"
              value={formData.speakerDetails}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Link to Report Consisting of Geotagged Photograph, Feedback,
              Attendance
            </Typography>
            <Input
              id="reportLink"
              size="lg"
              label="Link to Report Consisting of Geotagged Photograph, Feedback, Attendance"
              value={formData.reportLink}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Program Specific Outcomes (PSOs) Attained Through This Course
            </Typography>
            <Input
              id="psosAttained"
              size="lg"
              label="Program Specific Outcomes (PSOs) Attained Through This Course"
              value={formData.psosAttained}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Fund Generated
              </Typography>
              <Input
                id="fundGenerated"
                size="lg"
                label="Fund Generated"
                value={formData.fundGenerated}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsorship/Collaboration
              </Typography>
              <Input
                id="sponsorship"
                size="lg"
                label="Sponsorship/Collaboration"
                value={formData.sponsorship}
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
