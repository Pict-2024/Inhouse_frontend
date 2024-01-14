import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { addRecordsPatent } from "./API_Routes";

export default function PatentPublication() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Email,
    Name_of_the_Department: "",
    Patent_Application_No: "",
    Status_of_Patent_Pub: "",
    Inventor_s_Name: "",
    Title_of_the_Patent: "",
    Applicant_s_Name: "",
    Patent_Filed_Date: "",
    Patent_Pub_Grant_date: "",
    Patent_Pub_Number: "",
    Assignees_Name: "",
    Financial_Support_By_PICT: "",
    URL_Web_Links: "",
    Type_of_the_Patent: "",
    Country: "",
    Upload_Patent_Document: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsPatent, formData);
    navigate("/t/data");
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
          Patent Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Department
              </Typography>
              <Select
                name="Name_of_the_Department"
                size="lg"
                label="Department"
                value={formData.Name_of_the_Department}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Name_of_the_Department", value },
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
                Patent Application No.
              </Typography>
              <Input
                size="lg"
                name="Patent_Application_No"
                value={formData.Patent_Application_No}
                onChange={handleChange}
                label="Patent Application No."
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status of Patent (Published / Granted)
              </Typography>
              <Select
                name="Status_of_Patent_Pub"
                size="lg"
                label="Status"
                value={formData.Status_of_Patent_Pub}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Status_of_Patent_Pub", value },
                  })
                }
              >
                <Option value="Published">Published</Option>
                <Option value="Granted">Granted</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Inventors Name
              </Typography>
              <Input
                size="lg"
                name="Inventor_s_Name"
                value={formData.Inventor_s_Name}
                onChange={handleChange}
                label="Inventor's Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the Patent
              </Typography>
              <Input
                size="lg"
                name="Title_of_the_Patent"
                value={formData.Title_of_the_Patent}
                onChange={handleChange}
                label="Title of the Patent"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Applicants Name
              </Typography>
              <Input
                size="lg"
                name="Applicant_s_Name"
                value={formData.Applicant_s_Name}
                onChange={handleChange}
                label="Applicant's Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Filed Date
              </Typography>
              <Input
                size="lg"
                name="Patent_Filed_Date"
                value={formData.Patent_Filed_Date}
                onChange={handleChange}
                type="date"
                label="Patent Filed Date (DD/MM/YYYY)"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Published Date / Granted Date
              </Typography>
              <Input
                size="lg"
                name="Patent_Pub_Grant_date"
                value={formData.Patent_Pub_Grant_date}
                onChange={handleChange}
                type="date"
                label="Patent Published Date / Granted Date (DD/MM/YYYY)"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Publication Number / Patent Granted Number
              </Typography>
              <Input
                size="lg"
                name="Patent_Pub_Number"
                value={formData.Patent_Pub_Number}
                onChange={handleChange}
                label="Patent Publication Number / Patent Granted Number"
              />
            </div>
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Assignees Name (Institute Affiliation at the time of Application)
            </Typography>
            <Input
              size="lg"
              name="Assignees_Name"
              value={formData.Assignees_Name}
              onChange={handleChange}
              label="Assignee's Name"
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Financial Support by PICT Amount in Rs
            </Typography>
            <Input
              size="lg"
              name="Financial_Support_By_PICT"
              value={formData.Financial_Support_By_PICT}
              onChange={handleChange}
              label="Financial Support by PICT Amount in Rs"
            />
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Source Proof URL/Website Links, etc.
              </Typography>
              <Input
                size="lg"
                name="URL_Web_Links"
                value={formData.URL_Web_Links}
                onChange={handleChange}
                label="Source Proof URL/Website Links, etc."
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type of the Patent
              </Typography>
              <Input
                size="lg"
                name="Type_of_the_Patent"
                value={formData.Type_of_the_Patent}
                onChange={handleChange}
                label="Type of the Patent"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Country
              </Typography>
              <Input
                size="lg"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                label="Country"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Patent Document(Add drive link)
              </Typography>
              <Input
                size="lg"
                name="Upload_Patent_Document"
                onChange={handleChange}
                type="text"
                label="Upload Patent Document"
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
