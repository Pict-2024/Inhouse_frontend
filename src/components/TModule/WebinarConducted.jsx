import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addRecordsWebinar } from "./API_Routes";

export default function WebinarConducted() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Email,
    department: "",
    activityEvent: "",
    title: "",
    speakerResourcePerson: "",
    resourcePersonAffiliation: "",
    noOfParticipants: "",
    remarks: "",
    startDate: "",
    endDate: "",
    coordinators: "",
    targetedAudience: "",
    durationInHours: "",
    financialDetails: "",
  });

  const handleInputChange =  (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log("Form submitted:", formData);
    const response = await axios.post(addRecordsWebinar, formData);
    console.log("Response is : ", response.data);
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
              <Input
                size="lg"
                label="Department"
                onChange={handleInputChange}
                value={formData.department}
              />
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
                onChange={handleInputChange}
                value={formData.activityEvent}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                label="Title"
                onChange={handleInputChange}
                value={formData.title}
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
                onChange={handleInputChange}
                value={formData.speakerResourcePerson}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Resource Person Affiliation
              </Typography>
              <Input
                size="lg"
                label="Resource Person Affiliation"
                onChange={handleInputChange}
                value={formData.resourcePersonAffiliation}
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
                onChange={handleInputChange}
                value={formData.noOfParticipants}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remarks
              </Typography>
              <Input
                size="lg"
                label="Remarks"
                onChange={handleInputChange}
                value={formData.remarks}
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
                onChange={handleInputChange}
                value={formData.startDate}
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
                onChange={handleInputChange}
                value={formData.endDate}
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
                onChange={handleInputChange}
                value={formData.coordinators}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Targeted Audience Faculty/Students
              </Typography>
              <Input
                size="lg"
                label="Targeted Audience Faculty/Students"
                onChange={handleInputChange}
                value={formData.targetedAudience}
              />
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
                onChange={handleInputChange}
                value={formData.durationInHours}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial Details/Remuneration Paid
              </Typography>
              <Input
                size="lg"
                label="Financial Details/Remuneration Paid"
                onChange={handleInputChange}
                value={formData.financialDetails}
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
