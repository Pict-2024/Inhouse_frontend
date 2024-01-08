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
import { addRecordsTechnical } from "./API_Routes";

export default function TechnicalCompetitions() {
  const { currentUser } = useSelector((state) => state.user);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    T_ID:null,
    Username:currentUser?.Email,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can access formData to send it to your backend or perform other actions.
    // console.log(formData);
    const response = await axios.post(addRecordsTechnical, formData);
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
          Technical Competitions / Tech Fest Organized/Extra & Co-curricular
          activities Organized
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                label="Department"
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
                label="Principal Investigator Faculty Name"
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
                label="Project Title"
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
                label="Faculty Department"
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
                label="Name(s) of CO-PI"
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
                label="Department of CO-PI"
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
                label="Select Project Type"
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
                label="Name of Funding Agency"
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
                label="Name of the Scheme"
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
                label="Amount Sanctioned"
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
                label="Select Year"
                color="light-gray"
                name="yearOfGrant"
                value={formData.yearOfGrant}
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({
                    target: { id: "yearOfGrant", value },
                  })
                }
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
                label="Amount deposited to PICT account"
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
                label="Select Status"
                name="status"
                value={formData.status}
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({
                    target: { id: "status", value },
                  })
                }
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
                label="Duration"
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
                label="Outcome"
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
