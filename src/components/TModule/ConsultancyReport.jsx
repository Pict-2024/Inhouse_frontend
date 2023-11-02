import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function ConsultancyReport() {
  const [formData, setFormData] = useState({
    facultyName: "",
    departmentName: "",
    role: "",
    clientOrganisation: "",
    chiefConsultant: "",
    workTitle: "",
    type: "",
    amount: "",
    startDate: "",
    endDate: "",
    amountDeposited: "",
    transactionDate: "",
    evidenceLink: "",
    status: "",
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
          Consultancy Report
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Faculty Name
              </Typography>
              <Input
                size="lg"
                name="facultyName"
                value={formData.facultyName}
                placeholder="Faculty Name"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Department
              </Typography>
              <Input
                size="lg"
                name="departmentName"
                value={formData.departmentName}
                placeholder="Name of Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Input
                size="lg"
                name="role"
                value={formData.role}
                placeholder="Role"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Client Organisation
              </Typography>
              <Input
                size="lg"
                name="clientOrganisation"
                value={formData.clientOrganisation}
                placeholder="Client Organisation"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Chief Consultant
              </Typography>
              <Input
                size="lg"
                name="chiefConsultant"
                value={formData.chiefConsultant}
                placeholder="Chief Consultant"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Work domain
              </Typography>
              <Input
                size="lg"
                name="workTitle"
                value={formData.workTitle}
                placeholder="Title of Work domain"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type (Paid/Unpaid)
              </Typography>
              <Select
                size="lg"
                name="type"
                value={formData.type}
                placeholder="Select Type"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              >
                <Option value="Paid">Paid</Option>
                <Option value="Unpaid">Unpaid</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount
              </Typography>
              <Input
                size="lg"
                name="amount"
                value={formData.amount}
                placeholder="Amount"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
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
                name="startDate"
                value={formData.startDate}
                type="date"
                placeholder="Start Date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
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
                type="date"
                placeholder="End Date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Amount Deposited to college account
              </Typography>
              <Input
                size="lg"
                name="amountDeposited"
                value={formData.amountDeposited}
                placeholder="Amount Deposited to college account"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of Transaction
              </Typography>
              <Input
                size="lg"
                name="transactionDate"
                value={formData.transactionDate}
                type="date"
                placeholder="Date of Transaction"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to evidence
              </Typography>
              <Input
                size="lg"
                name="evidenceLink"
                value={formData.evidenceLink}
                placeholder="Link to evidence"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status (Completed/Ongoing)
              </Typography>
              <Select
                size="lg"
                name="status"
                value={formData.status}
                placeholder="Select Status"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              >
                <Option value="Completed">Completed</Option>
                <Option value="Ongoing">Ongoing</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Outcome
              </Typography>
              <Input
                size="lg"
                name="outcome"
                value={formData.outcome}
                placeholder="Outcome"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload All Documents in PDF related to Consulting
              </Typography>
              <Input
                size="lg"
                type="file"
                placeholder="Upload PDF Documents"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>
          <Button className="mt-4" fullWidth type="submit">
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
