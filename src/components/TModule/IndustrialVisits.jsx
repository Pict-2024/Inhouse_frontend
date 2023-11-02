import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function IndustrialVisit() {
  const [formData, setFormData] = useState({
    staffName: "",
    department: "",
    companyAddress: "",
    purposeOfVisit: "",
    numberOfStudents: "",
    dateOfVisit: "",
    coordinators: "",
    financialSupport: "",
    reportApproval: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can access form data in the formData object
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
          Industrial Visits / Tours / Field Trip
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the staff
              </Typography>
              <Input
                size="lg"
                name="staffName"
                value={formData.staffName}
                placeholder="Name of the staff"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                name="department"
                value={formData.department}
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name and address of the Company / Industry visited
              </Typography>
              <Input
                size="lg"
                name="companyAddress"
                value={formData.companyAddress}
                placeholder="Name and address of the Company / Industry visited"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Purpose of the visit
              </Typography>
              <Input
                size="lg"
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                placeholder="Purpose of the visit"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Students
              </Typography>
              <Input
                size="lg"
                name="numberOfStudents"
                value={formData.numberOfStudents}
                placeholder="No. of Students"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of visit (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                name="dateOfVisit"
                value={formData.dateOfVisit}
                placeholder="Date of visit"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Coordinator(s)
              </Typography>
              <Input
                size="lg"
                name="coordinators"
                value={formData.coordinators}
                placeholder="Coordinator(s)"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support from PICT
              </Typography>
              <Input
                size="lg"
                name="financialSupport"
                value={formData.financialSupport}
                placeholder="Financial support from PICT"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Report with approval application
            </Typography>
            <Input
              size="lg"
              name="reportApproval"
              value={formData.reportApproval}
              placeholder="Report with approval application"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleChange}
            />
          </div>

          <Button className="mt-4" fullWidth type="submit">
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
