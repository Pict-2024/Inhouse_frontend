import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function FacultyResource() {
  const [formData, setFormData] = useState({
    staffName: "",
    department: "",
    achievementDetails: "",
    eventName: "",
    level: "",
    topic: "",
    organizer: "",
    date: "",
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
    // Handle form submission here, you can access form data in formData object
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
          Faculty as Resource Person
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Staff
              </Typography>
              <Input
                size="lg"
                name="staffName"
                value={formData.staffName}
                placeholder="Name of the Staff"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name Of the department
              </Typography>
              <Input
                size="lg"
                name="department"
                value={formData.department}
                placeholder="Name Of the department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of FDP / Workshop / Other
              </Typography>
              <Input
                size="lg"
                name="eventName"
                value={formData.eventName}
                placeholder="Name of FDP / Workshop / Other"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Input
                size="lg"
                name="level"
                value={formData.level}
                placeholder="Level"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Topic
              </Typography>
              <Input
                size="lg"
                name="topic"
                value={formData.topic}
                placeholder="Topic"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Organizer
              </Typography>
              <Input
                size="lg"
                name="organizer"
                value={formData.organizer}
                placeholder="Organizer"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                name="date"
                value={formData.date}
                placeholder="Date"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
