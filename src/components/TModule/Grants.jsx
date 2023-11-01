import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Grants() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  // Define state variables for form fields
  const [formData, setFormData] = useState({
    teacherName: "",
    department: "",
    principalInvestigatorName: "",
    projectTitle: "",
    facultyDepartment: "",
    coPiNames: "",
    coPiDepartment: "",
    projectType: "",
    fundingAgency: "",
    schemeName: "",
    amountSanctioned: "",
    yearOfGrant: "",
    startDate: "",
    endDate: "",
    amountDeposited: "",
    transactionDate: "",
    status: "",
    duration: "",
    outcome: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the `formData` object
    console.log(formData);
    // Add your submission logic here
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Teacher
              </Typography>
              <Input
                size="lg"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                placeholder="Name of Teacher"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                onChange={handleChange}
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Principal Investigator Faculty Name
              </Typography>
              <Input
                size="lg"
                name="principalInvestigatorName"
                value={formData.principalInvestigatorName}
                onChange={handleChange}
                placeholder="Principal Investigator Faculty Name"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Project Title
              </Typography>
              <Input
                size="lg"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                placeholder="Project Title"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Faculty Department
              </Typography>
              <Input
                size="lg"
                name="facultyDepartment"
                value={formData.facultyDepartment}
                onChange={handleChange}
                placeholder="Faculty Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name(s) of CO-PI
              </Typography>
              <Input
                size="lg"
                name="coPiNames"
                value={formData.coPiNames}
                onChange={handleChange}
                placeholder="Name(s) of CO-PI"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                name="coPiDepartment"
                value={formData.coPiDepartment}
                onChange={handleChange}
                placeholder="Department of CO-PI"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Project Type (Government/Non Government)
              </Typography>
              <Select
                size="lg"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                placeholder="Select Project Type"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                name="fundingAgency"
                value={formData.fundingAgency}
                onChange={handleChange}
                placeholder="Name of Funding Agency"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Scheme
              </Typography>
              <Input
                size="lg"
                name="schemeName"
                value={formData.schemeName}
                onChange={handleChange}
                placeholder="Name of the Scheme"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount Sanctioned
              </Typography>
              <Input
                size="lg"
                name="amountSanctioned"
                value={formData.amountSanctioned}
                onChange={handleChange}
                placeholder="Amount Sanctioned"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of grant received
              </Typography>
              <Select
                size="lg"
                name="yearOfGrant"
                value={formData.yearOfGrant}
                onChange={handleChange}
                placeholder="Select Year"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
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
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount deposited to PICT account
              </Typography>
              <Input
                size="lg"
                name="amountDeposited"
                value={formData.amountDeposited}
                onChange={handleChange}
                placeholder="Amount deposited to PICT account"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Transaction date
              </Typography>
              <Input
                size="lg"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status (Ongoing/ Completed)
              </Typography>
              <Select
                size="lg"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Select Status"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              >
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration
              </Typography>
              <Input
                size="lg"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
                placeholder="Outcome"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
