import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function ConfeSeminar() {
  const [formData, setFormData] = useState({
    // teacherName: "",
    department: "",
    title: "",
    level: "",
    sponsoringAuthority: "",
    participants: "",
    startDate: "",
    endDate: "",
    resourcePersons: "",
    coordinators: "",
    remarks: "",
    sponsorshipAmount: "",
    participantsFromPICT: "",
    participantsOutsidePICT: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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
          Conferences, Seminars, Workshops, FDP, STTP Organized /conducted
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Teacher
              </Typography>
              <Input
                id="teacherName"
                size="lg"
                placeholder="Name of Teacher"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.teacherName}
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
                Activity/Event/FDP/STTP/Workshop Title
              </Typography>
              <Input
                id="title"
                size="lg"
                placeholder="Title"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                University/State/National/International
              </Typography>
              <Select
                id="level"
                size="lg"
                placeholder="Select Level"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.level}
                onChange={handleOnChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State">State</Option>
                <Option value="University">University</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsoring Authority
              </Typography>
              <Input
                id="sponsoringAuthority"
                size="lg"
                placeholder="Sponsoring Authority"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.sponsoringAuthority}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Participants
              </Typography>
              <Input
                id="participants"
                size="lg"
                placeholder="No. of Participants"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.participants}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date(DD-MM-YYYY)
              </Typography>
              <Input
                id="startDate"
                size="lg"
                placeholder="Start Date"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.startDate}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date(DD-MM-YYYY)
              </Typography>
              <Input
                id="endDate"
                size="lg"
                placeholder="End Date"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.endDate}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              List of Resource Persons
            </Typography>
            <Input
              id="resourcePersons"
              size="lg"
              placeholder="List of Resource Persons"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              value={formData.resourcePersons}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Coordinator(s)
              </Typography>
              <Input
                id="coordinators"
                size="lg"
                placeholder="Name of the Coordinator(s)"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.coordinators}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remarks
              </Typography>
              <Input
                id="remarks"
                size="lg"
                placeholder="Remarks"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.remarks}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsorship Amount
              </Typography>
              <Input
                id="sponsorshipAmount"
                size="lg"
                placeholder="Sponsorship Amount"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.sponsorshipAmount}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Participants from PICT
              </Typography>
              <Input
                id="participantsFromPICT"
                size="lg"
                placeholder="Number of Participants from PICT"
                type="number"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.participantsFromPICT}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Number of Participants from outside PICT
            </Typography>
            <Input
              id="participantsOutsidePICT"
              size="lg"
              placeholder="Number of Participants from outside PICT"
              type="number"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              value={formData.participantsOutsidePICT}
              onChange={handleOnChange}
            />
          </div>

          <Button className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
