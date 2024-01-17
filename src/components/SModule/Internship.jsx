import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Internship() {
  // const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const options = Array.from({ length: 11 }, (_, index) => index + 1);
  const [formData, setFormData] = useState({
    S_ID: null,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: "",
    Department: "",
    Year: "",
    Div: "",
    Mobile_No: "",
    Email_ID: currentUser?.Email,
    Internship_Title: "",
    Internship_Organizer: "",
    Internship_Company_Website_Address: "",
    Company_Address: "",
    Duration: "",
    Mode: "",
    Stipend: "",
    Internal_Mentor_Name: "",
    External_Mentor_Name: "",
    External_Mentor_Email: "",
    External_Mentor_Mobile: "",
    Completion_Certificate: null,
    Internship_Report: null,
    PPO_Offer: "",
    Remark: "",
  });

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post(, formData);
    // navigate("/t/data");
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
          Student Internship Details
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                id="Department"
                size="lg"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Department", value },
                  })
                }
              >
                <Option value="CS">CS</Option>
                <Option value="IT">IT</Option>
                <Option value="EnTC">EnTC</Option>
                <Option value="FE">FE</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Academic Year
              </Typography>
              <Input
                id="Academic_Year"
                size="lg"
                label="Eg.2022-2023"
                value={formData.Academic_Year}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Student Name
              </Typography>
              <Input
                id="Student_Name"
                size="lg"
                label="Student Name"
                value={formData.Student_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Roll No
              </Typography>
              <Input
                id="Roll_No"
                size="lg"
                label="Roll No"
                value={formData.Roll_No}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mobile No
              </Typography>
              <Input
                id="Mobile_No"
                size="lg"
                label="Mobile No"
                value={formData.Mobile_No}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Division
              </Typography>
              <Select
                id="Div"
                label="Eg.11"
                size="lg"
                value={formData.Div}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Div", value },
                  })
                }
              >
                {options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Title
              </Typography>
              <Input
                id="Internship_Title"
                size="lg"
                label="Internship Title"
                value={formData.Internship_Title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Organizer
              </Typography>
              <Input
                id="Internship_Organizer"
                size="lg"
                label="Internship Organizer"
                value={formData.Internship_Organizer}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Company Website Address
              </Typography>
              <Input
                id="Internship_Company_Website_Address"
                size="lg"
                label="Internship Company Website Address"
                value={formData.Internship_Company_Website_Address}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Company Address
              </Typography>
              <Input
                id="Company_Address"
                size="lg"
                label="Company Address"
                value={formData.Company_Address}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mode
              </Typography>
              <Select
                id="Mode"
                size="lg"
                label="Select Mode"
                value={formData.Mode}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Mode", value },
                  })
                }
              >
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in Months
              </Typography>
              <Input
                id="Duration"
                size="lg"
                label="Duration"
                value={formData.Duration}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Stipend (Rs)
              </Typography>
              <Input
                id="Stipend"
                size="lg"
                label="Stipend"
                value={formData.Stipend}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of Study
              </Typography>
              <Select
                id="Year"
                size="lg"
                label="Year"
                value={formData.Year}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Year", value },
                  })
                }
              >
                <Option value="FE">FE</Option>
                <Option value="SE">SE</Option>
                <Option value="TE">TE</Option>
                <Option value="BE">BE</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internal Mentor Name
              </Typography>
              <Input
                id="Internal_Mentor_Name"
                size="lg"
                label="Internal Mentor Name"
                value={formData.Internal_Mentor_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                External Mentor Name
              </Typography>
              <Input
                id="External_Mentor_Name"
                size="lg"
                label="External Mentor Name"
                value={formData.External_Mentor_Name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                External Mentor Email
              </Typography>
              <Input
                id="External_Mentor_Email"
                size="lg"
                label="External Mentor Email"
                value={formData.External_Mentor_Email}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                External Mentor Mobile
              </Typography>
              <Input
                id="External_Mentor_Mobile"
                size="lg"
                label="External Mentor Mobile"
                value={formData.External_Mentor_Mobile}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Completion Certificate (drive link)
              </Typography>
              <Input
                id="Completion_Certificate"
                size="lg"
                label="Completion Certificate"
                type="text"
                value={formData.Completion_Certificate}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Internship Report (drive link)
              </Typography>
              <Input
                id="Internship_Report"
                size="lg"
                type="text"
                label="Internship Report"
                value={formData.Internship_Report}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                PPO Offer
              </Typography>
              <Input
                id="PPO_Offer"
                size="lg"
                label="PPO Offer"
                value={formData.PPO_Offer}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remark
              </Typography>
              <Input
                id="Remark"
                size="lg"
                label="Remark"
                value={formData.Remark}
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
