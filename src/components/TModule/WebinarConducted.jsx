import {
  Card,
  Input,
  Button,
  Typography,
  Option,
  Select,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addRecordsWebinar } from "./API_Routes";

export default function WebinarConducted() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Department: "",
    Activity_Event: "",
    Title: "",
    Speaker_Resource_Person: "",
    Resource_Person_Affiliation: "",
    No_of_Participants: "",
    Remarks: "",
    Start_Date: "",
    End_Date: "",
    Name_of_Coordinators: "",
    Targeted_Audience: "",
    Duration_in_Hrs: "",
    Renumeration_Paid: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsWebinar, formData);
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
          Webinar/Guest-Expert Lecture / Video conference /Invited talks
          organized /conducted
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                id="Department"
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
                Activity/Event
              </Typography>
              <Input
                size="lg"
                label="Activity/Event"
                name="Activity_Event"
                onChange={handleInputChange}
                value={formData.Activity_Event}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                label="Title"
                name="Title"
                onChange={handleInputChange}
                value={formData.Title}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Speaker/Resource Person
              </Typography>
              <Input
                size="lg"
                label="Speaker/Resource Person"
                name="Speaker_Resource_Person"
                onChange={handleInputChange}
                value={formData.Speaker_Resource_Person}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Resource Person Affiliation
              </Typography>
              <Input
                size="lg"
                label="Resource Person Affiliation"
                name="Resource_Person_Affiliation"
                onChange={handleInputChange}
                value={formData.Resource_Person_Affiliation}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Participants
              </Typography>
              <Input
                size="lg"
                label="No. of Participants"
                type="number"
                name="No_of_Participants"
                onChange={handleInputChange}
                value={formData.No_of_Participants}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remarks
              </Typography>
              <Input
                size="lg"
                label="Remarks"
                name="Remarks"
                onChange={handleInputChange}
                value={formData.Remarks}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                label="Start Date"
                type="date"
                name="Start_Date"
                onChange={handleInputChange}
                value={formData.Start_Date}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                label="End Date"
                type="date"
                name="End_Date"
                onChange={handleInputChange}
                value={formData.End_Date}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the coordinator(s)
              </Typography>
              <Input
                size="lg"
                label="Name of the coordinator(s)"
                name="Name_of_Coordinators"
                onChange={handleInputChange}
                value={formData.Name_of_Coordinators}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Targeted Audience Faculty/Students
              </Typography>
              <Select
                size="lg"
                label="Targeted Audience Faculty/Students"
                name="Targeted_Audience"
                value={formData.Targeted_Audience}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Targeted_Audience", value },
                  })
                }
              >
                <Option value="Faculty">Faculty</Option>
                <Option value="Student">Student</Option>
                <Option value="Other">Other</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in Hrs
              </Typography>
              <Input
                size="lg"
                label="Duration in Hrs"
                name="Duration_in_Hrs"
                onChange={handleInputChange}
                value={formData.Duration_in_Hrs}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial Details/Remuneration Paid
              </Typography>
              <Input
                size="lg"
                label="Financial Details/Remuneration Paid"
                name="Renumeration_Paid"
                onChange={handleInputChange}
                value={formData.Renumeration_Paid}
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
