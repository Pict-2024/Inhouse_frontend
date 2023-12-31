import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Attended() {
  const [formData, setFormData] = useState({
    // name: "",
    department: "",
    eventTitle: "",
    eventType: "",
    instituteName: "",
    coordinators: "",
    startDate: "",
    endDate: "",
    mode: "",
    duration: "",
    financeSupport: "",
    certificate: null,
  });

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    // Handle form submission here
    
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
          STTP/FDP/Workshop/Conference Attended
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Faculty
              </Typography>
              <Input
                id="name"
                size="lg"
                placeholder="Name of Faculty"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div> */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                id="department"
                size="lg"
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.department}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the Event
              </Typography>
              <Input
                id="eventTitle"
                size="lg"
                placeholder="Title of the Event"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.eventTitle}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type/Nature (FDP/STTP/Workshop/Conference etc)
              </Typography>
              <Input
                id="eventType"
                size="lg"
                placeholder="Type/Nature"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.eventType}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of organizing Institute
              </Typography>
              <Input
                id="instituteName"
                size="lg"
                placeholder="Organizing Institute"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.instituteName}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the coordinator(s)
              </Typography>
              <Input
                id="coordinators"
                size="lg"
                placeholder="Coordinator(s)"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.coordinators}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date (DD-MM-YYYY)
              </Typography>
              <Input
                id="startDate"
                size="lg"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.startDate}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date (DD-MM-YYYY)
              </Typography>
              <Input
                id="endDate"
                size="lg"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.endDate}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mode: Online/Physical
              </Typography>
              <Select
                id="mode"
                size="lg"
                placeholder="Select Mode"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.mode}
                onChange={handleOnChange}
              >
                <Option value="Online">Online</Option>
                <Option value="Physical">Physical</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in Days
              </Typography>
              <Input
                id="duration"
                size="lg"
                placeholder="Duration"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.duration}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Finance Support Received from PICT
              </Typography>
              <Input
                id="financeSupport"
                size="lg"
                placeholder="Finance Support Received from PICT"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.financeSupport}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Certificate(Add drive link)
              </Typography>
              <Input
                id="certificate"
                size="lg"
                type="text"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
