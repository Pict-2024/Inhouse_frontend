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

import { addRecordsContribution } from "./API_Routes";

export default function Contribution() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Department: "",
    Academic_Year: "",
    Faculty_Name: "",
    Role: "",
    University_Institution: "",
    Body_Name: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //add new reocrd
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsContribution, formData);
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
          Contribution to BoS
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full  px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                size="lg"
                name="Department"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleOnChange({
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
                Academic Year
              </Typography>
              <Input
                size="lg"
                name="Academic_Year"
                value={formData.Academic_Year}
                label="Academic Year"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of teacher participated
              </Typography>
              <Input
                size="lg"
                name="Faculty_Name"
                value={formData.Faculty_Name}
                label="Name of teacher participated"
                onChange={handleOnChange}
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
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                University/Institution
              </Typography>
              <Input
                size="lg"
                name="University_Institution"
                value={formData.University_Institution}
                label="University/Institution"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Name of the body in which full-time teacher participated
            </Typography>
            <Input
              size="lg"
              name="Body_Name"
              value={formData.Body_Name}
              label="Name of the body"
              onChange={handleOnChange}
            />
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
