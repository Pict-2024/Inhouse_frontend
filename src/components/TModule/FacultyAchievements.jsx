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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsAchievements } from "./API_Routes";

export default function FacultyAchievements() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Department: "",
    Achievement_Details: "",
    Name_of_Event: "",
    Name_of_Organiser: "",
    Level: "",
    Award_Type: "",
    Award_Prize_Money: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsAchievements, formData);
    toast.success("Record Added Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/t/data");
  };

  return (
    <div className="">
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-85  p-2 mt-2 rounded-md"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          Faculty Achievement
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                size="lg"
                name="Department"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Department", value },
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
                Achievement / Awards Details
              </Typography>
              <Input
                size="lg"
                name="Achievement_Details"
                value={formData.Achievement_Details}
                label="Achievement / Awards Details"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Event
              </Typography>
              <Input
                size="lg"
                name="Name_of_Event"
                value={formData.Name_of_Event}
                label="Name of Event"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Organiser
              </Typography>
              <Input
                size="lg"
                name="Name_of_Organiser"
                value={formData.Name_of_Organiser}
                label="Name of Organiser"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievement Level
              </Typography>
              <Select
                size="lg"
                name="Level"
                value={formData.Level}
                label="Select Level"
                onChange={(value) =>
                  handleInputChange({
                    target: { id: "Level", value },
                  })
                }
                // onChange={handleInputChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State">State</Option>
                <Option value="University">University</Option>
                <Option value="District">District</Option>
                <Option value="Institue">Institue</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award Type (Winner, Runner, Consolation, Appreciation)
              </Typography>
              <Select
                size="lg"
                name="Award_Type"
                value={formData.Award_Type}
                label="Select Award Type"
                onChange={(value) =>
                  handleInputChange({
                    target: { id: "Award_Type", value },
                  })
                }
                // onChange={handleInputChange}
              >
                <Option value="Winner">Winner</Option>
                <Option value="Runner">Runner</Option>
                <Option value="Consolation">Consolation</Option>
                <Option value="Appreciation">Appreciation</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award/Prize Money
              </Typography>
              <Input
                size="lg"
                name="Award_Prize_Money"
                value={formData.Award_Prize_Money}
                label="Award/Prize Money"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
