import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function TechnicalCompetitions() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    // nameOfTeacher: "",
    department: "",
    principalInvestigator: "",
    projectTitle: "",
    facultyDepartment: "",
    coPiName: "",
    departmentOfCoPi: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can access formData to send it to your backend or perform other actions.
    console.log(formData);
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
          Technical Competitions / Tech Fest Organized/Extra & Co-curricular
          activities Organized
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Teacher
              </Typography>
              <Input
                size="lg"
                placeholder="Name of Teacher"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="nameOfTeacher"
                value={formData.nameOfTeacher}
                onChange={handleChange}
              />
            </div> */}

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="department"
                value={formData.department}
                onChange={handleChange}
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
                placeholder="Principal Investigator Faculty Name"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="principalInvestigator"
                value={formData.principalInvestigator}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Project Title
              </Typography>
              <Input
                size="lg"
                placeholder="Project Title"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
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
                placeholder="Faculty Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="facultyDepartment"
                value={formData.facultyDepartment}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name(s) of CO-PI
              </Typography>
              <Input
                size="lg"
                placeholder="Name(s) of CO-PI"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="coPiName"
                value={formData.coPiName}
                onChange={handleChange}
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
                placeholder="Department of CO-PI"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="departmentOfCoPi"
                value={formData.departmentOfCoPi}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Project Type (Government/Non Government)
              </Typography>
              <Select
                size="lg"
                placeholder="Select Project Type"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
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
                placeholder="Name of Funding Agency"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="fundingAgency"
                value={formData.fundingAgency}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Scheme
              </Typography>
              <Input
                size="lg"
                placeholder="Name of the Scheme"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="schemeName"
                value={formData.schemeName}
                onChange={handleChange}
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
                placeholder="Amount Sanctioned"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="amountSanctioned"
                value={formData.amountSanctioned}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of grant received
              </Typography>
              <Select
                size="lg"
                placeholder="Select Year"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="yearOfGrant"
                value={formData.yearOfGrant}
                onChange={handleChange}
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
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date
              </Typography>
              <Input
                size="lg"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
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
                placeholder="Amount deposited to PICT account"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="amountDeposited"
                value={formData.amountDeposited}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Transaction date
              </Typography>
              <Input
                size="lg"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
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
                placeholder="Select Status"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="status"
                value={formData.status}
                onChange={handleChange}
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
                placeholder="Duration"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Outcome
              </Typography>
              <Input
                size="lg"
                placeholder="Outcome"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
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
