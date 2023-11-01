import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function CertificateCourses() {
  const [formData, setFormData] = useState({
    staffName: "",
    department: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Staff
              </Typography>
              <Input
                id="staffName"
                size="lg"
                placeholder="Name of the Staff"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.staffName}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                id="department"
                size="lg"
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.department}
                onChange={handleOnChange}
              />
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
                placeholder="Name of Add-On / Certificate Program"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Year of Offering"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="No. of Times Offered During the Same Year"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Duration of Course"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Start Date"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="End Date"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Number of Students Enrolled in the Year"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Number of Students Completing the Course in the Year"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
              placeholder="Names of Speakers"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
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
              placeholder="Speaker Details"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
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
              placeholder="Link to Report Consisting of Geotagged Photograph, Feedback, Attendance"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
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
              placeholder="Program Specific Outcomes (PSOs) Attained Through This Course"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Fund Generated"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                placeholder="Sponsorship/Collaboration"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
