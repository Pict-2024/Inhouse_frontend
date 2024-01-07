import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function FacultyAchievements() {
  const [formData, setFormData] = useState({
    department: "",
    achievementDetails: "",
    eventName: "",
    organiserName: "",
    achievementLevel: "",
    awardType: "",
    awardMoney: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
              <Input
                size="lg"
                name="department"
                value={formData.department}
                label="Department"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievement / Awards Details
              </Typography>
              <Input
                size="lg"
                name="achievementDetails"
                value={formData.achievementDetails}
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
                name="eventName"
                value={formData.eventName}
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
                name="organiserName"
                value={formData.organiserName}
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
                name="achievementLevel"
                value={formData.achievementLevel}
                label="Select Level"
                onChange={handleInputChange}
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
                name="awardType"
                value={formData.awardType}
                label="Select Award Type"
                onChange={handleInputChange}
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
                name="awardMoney"
                value={formData.awardMoney}
                label="Award/Prize Money"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
