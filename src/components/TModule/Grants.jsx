import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
// import axios from 'axios';

export default function Grants() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  // Define state variables for form fields
  const [formData, setFormData] = useState({
    // teacherName: "",
    Department: "",
    Principal_Investigator_Faculty_Name: "",
    Project_Title: "",
    Faculty_Department: "",
    Names_of_CO_PI: "",
    Department_of_CO_PI: "",
    Project_Type_Government_Non_Government: "",
    Name_of_Funding_Agency: "",
    Name_of_the_Scheme: "",
    Amount_Sanctioned: "",
    Year_of_grant_received: "",
    Start_Date: "",
    End_Date: "",
    Amount_deposited_to_PICT_account: "",
    Transaction_date: "",
    Status_Ongoing_Completed: "",
    Duration: "",
    Outcome: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //fetch all entries
  // const getAllEntries = async ()=>{
  //   const response = await axios.get(`{process.env.BASE_URL}/teacher/grants/all`);
  // }

  // add new entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await axios.post(`${process.env.BASE_URL}/teacher/grants/create-new`,
    // formData);
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
          Grants
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
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
            </div> */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                name="Department"
                value={formData.Department}
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
                name="Principal_Investigator_Faculty_Name"
                value={formData.Principal_Investigator_Faculty_Name}
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
                name="Project_Title"
                value={formData.Project_Title}
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
                name="Faculty_Department"
                value={formData.Faculty_Department}
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
                name="Names_of_CO_PI"
                value={formData.Names_of_CO_PI}
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
                name="Department_of_CO_PI"
                value={formData.Department_of_CO_PI}
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
                name="Project_Type_Government_Non_Government"
                value={formData.Project_Type_Government_Non_Government}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Project_Type_Government_Non_Government",
                      value,
                    },
                  })
                }
                // onChange={handleChange}
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
                name="Name_of_Funding_Agency"
                value={formData.Name_of_Funding_Agency}
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
                name="Name_of_the_Scheme"
                value={formData.Name_of_the_Scheme}
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
                name="Amount_Sanctioned"
                value={formData.Amount_Sanctioned}
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
                name="Year_of_grant_received"
                value={formData.Year_of_grant_received}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Year_of_grant_received",
                      value,
                    },
                  })
                }
                // onChange={handleChange}
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
                name="Start_Date"
                value={formData.Start_Date}
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
                name="End_Date"
                value={formData.End_Date}
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
                name="Amount_deposited_to_PICT_account"
                value={formData.Amount_deposited_to_PICT_account}
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
                name="Transaction_date"
                value={formData.Transaction_date}
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
                name="Status_Ongoing_Completed"
                value={formData.Status_Ongoing_Completed}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Status_Ongoing_Completed", value },
                  })
                }
                // onChange={handleChange}
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
                name="Duration"
                value={formData.Duration}
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
                name="Outcome"
                value={formData.Outcome}
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
