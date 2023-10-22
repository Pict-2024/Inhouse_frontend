import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
  export default function CertificateCourses() {
    // const currentYear = new Date().getFullYear();
    // const years = Array.from(
    //   { length: currentYear - 1999 },
    //   (_, index) => currentYear - index
    // );
  
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
  
          <form className="mt-8 mb-2">
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Name of the Staff
                </Typography>
                <Input
                  size="lg"
                  placeholder="Name of the Staff"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Department
                </Typography>
                <Input
                  size="lg"
                  placeholder="Department"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Name of Add-On / Certificate Program
                </Typography>
                <Input
                  size="lg"
                  placeholder="Name of Add-On / Certificate Program"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Year of Offering
                </Typography>
                <Input
                  size="lg"
                  placeholder="Year of Offering"
                  type="number"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  No. of Times Offered During the Same Year
                </Typography>
                <Input
                  size="lg"
                  placeholder="No. of Times Offered During the Same Year"
                  type="number"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Duration of Course
                </Typography>
                <Input
                  size="lg"
                  placeholder="Duration of Course"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                  placeholder="Start Date"
                  type="date"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  End Date
                </Typography>
                <Input
                  size="lg"
                  placeholder="End Date"
                  type="date"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Number of Students Enrolled in the Year
                </Typography>
                <Input
                  size="lg"
                  placeholder="Number of Students Enrolled in the Year"
                  type="number"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Number of Students Completing the Course in the Year
                </Typography>
                <Input
                  size="lg"
                  placeholder="Number of Students Completing the Course in the Year"
                  type="number"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Names of Speakers
              </Typography>
              <Input
                size="lg"
                placeholder="Names of Speakers"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Speaker Details
              </Typography>
              <Input
                size="lg"
                placeholder="Speaker Details"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to Report Consisting of Geotagged Photograph, Feedback, Attendance
              </Typography>
              <Input
                size="lg"
                placeholder="Link to Report Consisting of Geotagged Photograph, Feedback, Attendance"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Program Specific Outcomes (PSOs) Attained Through This Course
              </Typography>
              <Input
                size="lg"
                placeholder="Program Specific Outcomes (PSOs) Attained Through This Course"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Fund Generated
                </Typography>
                <Input
                  size="lg"
                  placeholder="Fund Generated"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Sponsorship/Collaboration
                </Typography>
                <Input
                  size="lg"
                  placeholder="Sponsorship/Collaboration"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <Button className="mt-4" fullWidth>
              Add Changes
            </Button>
          </form>
        </Card>
      </>
    );
  }
  