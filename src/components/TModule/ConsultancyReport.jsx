import {  useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { addRecordsConsultancy } from "./API_Routes";
import { useSelector } from "react-redux";

export default function ConsultancyReport() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Email,
    Name_of_Department: "",
    Role: "",
    Client_Organisation: "",
    Chief_Consultant: "",
    Title_of_Work_domain: "",
    Type_Paid_Unpaid: "",
    Amount: "",
    Start_Date: "",
    End_Date: "",
    Amt_Deposited: "",
    Date_of_Transaction: "",
    Link_to_evidence: "",
    Status: "",
    Outcome: "",
    Upload_Docs: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Add records
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("FormData: ", formData);
    const response = await axios.post(addRecordsConsultancy, formData);
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
          Consultancy Report
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Department
              </Typography>
              <Input
                size="lg"
                name="Name_of_Department"
                value={formData.Name_of_Department}
                label="Name of Department"
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
                name="Role"
                value={formData.Role}
                label="Role"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Client Organisation
              </Typography>
              <Input
                size="lg"
                name="Client_Organisation"
                value={formData.Client_Organisation}
                label="Client Organisation"
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
                name="Chief_Consultant"
                value={formData.Chief_Consultant}
                label="Chief Consultant"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Work domain
              </Typography>
              <Input
                size="lg"
                name="Title_of_Work_domain"
                value={formData.Title_of_Work_domain}
                label="Title of Work domain"
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
                name="Type_Paid_Unpaid"
                value={formData.Type_Paid_Unpaid}
                label="Select Type"
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({ target: { name: "Type_Paid_Unpaid", value } })
                }
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
                name="Amount"
                value={formData.Amount}
                label="Amount"
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
                name="Start_Date"
                value={formData.Start_Date}
                type="date"
                label="Start Date"
                onChange={handleChange}
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
                type="date"
                label="End Date"
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
                name="Amt_Deposited"
                value={formData.Amt_Deposited}
                label="Amount Deposited to college account"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of Transaction
              </Typography>
              <Input
                size="lg"
                name="Date_of_Transaction"
                value={formData.Date_of_Transaction}
                type="date"
                label="Date of Transaction"
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
                name="Link_to_evidence"
                value={formData.Link_to_evidence}
                label="Link to evidence"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status (Completed/Ongoing)
              </Typography>
              <Select
                size="lg"
                name="Status"
                value={formData.Status}
                label="Select Status"
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({ target: { name: "Status", value } })
                }
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
                name="Outcome"
                value={formData.Outcome}
                label="Outcome"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload All Documents in PDF related to Consulting
              </Typography>
              <Input
                size="lg"
                type="text"
                name="Upload_Docs"
                value={formData.Upload_Docs}
                label="Upload PDF Documents(Add drive link)"
                onChange={handleChange}
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
