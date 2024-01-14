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

import { addRecordsTechnical } from "./API_Routes";

export default function TechnicalCompetitions() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Email,
    Department: "",
    Name_of_Competition: "",
    No_of_participants: "",
    Duration: "",
    Achievement_Obtained: "",
    Start_Date: "",
    End_Date: "",
    Names_of_Participants: "",
    Level: "",
    Sponsorship: "",
    Finance_Support_By_PICT: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsTechnical, formData);
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
          Technical Competitions / Tech Fest Organized/Extra & Co-curricular
          activities Organized
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
                  handleChange({
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
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Competition
              </Typography>
              <Input
                size="lg"
                label="Name of Competition"
                name="Name_of_Competition"
                value={formData.Name_of_Competition}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration
              </Typography>
              <Input
                size="lg"
                label="Duration"
                name="Duration"
                value={formData.Duration}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No of Participants
              </Typography>
              <Input
                size="lg"
                label="No of Participants"
                name="No_of_participants"
                value={formData.No_of_participants}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievements Obtained
              </Typography>
              <Input
                size="lg"
                label="Achievements Obtained"
                name="Achievement_Obtained"
                value={formData.Achievement_Obtained}
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
                type="date"
                name="Start_Date"
                label="Start Date"
                value={formData.Start_Date}
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
                label="End Date"
                name="End_Date"
                value={formData.End_Date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Names of Participants
              </Typography>
              <Input
                size="lg"
                type="date"
                label="Names of Participants"
                name="Names_of_Participants"
                value={formData.Names_of_Participants}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                size="lg"
                label="Select level"
                name="Level"
                value={formData.Level}
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({
                    target: { id: "Level", value },
                  })
                }
              >
                <Option value="College">College</Option>
                <Option value="Department">Department</Option>
                <Option value="National">National</Option>
                <Option value="International">International</Option>
              </Select>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsorship
              </Typography>
              <Input
                size="lg"
                label="Sponsorship"
                name="Sponsorship"
                value={formData.Sponsorship}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Finance_Support_By_PICT
              </Typography>
              <Input
                size="lg"
                label="Finance_Support_By_PICT"
                name="Finance_Support_By_PICT"
                value={formData.Finance_Support_By_PICT}
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
