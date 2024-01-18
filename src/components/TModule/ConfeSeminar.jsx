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

import { addRecordsConference } from "./API_Routes";

export default function ConfeSeminar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Department: "",
    Title: "",
    University: "",
    Activity_Event_FDP_STTP_Workshop: "",
    Sponsoring_Authority: "",
    No_of_Participants: "",
    Start_Date_DD_MM_YYYY: "",
    End_Date_DD_MM_YYYY: "",
    List_of_Resource_Persons: "",
    Name_of_the_Coordinators: "",
    Remarks: "",
    Sponsorship_Amount: "",
    Number_of_participants_from_PICT: "",
    Number_of_participants_from_outside_PICT: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsConference, formData);
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
          Conferences, Seminars, Workshops, FDP, STTP Organized /conducted
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
                Activity/Event/FDP/STTP/Workshop
              </Typography>
              <Input
                id="Activity_Event_FDP_STTP_Workshop"
                size="lg"
                label="Activity_Event_FDP_STTP_Workshop"
                value={formData.Activity_Event_FDP_STTP_Workshop}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title
              </Typography>
              <Input
                id="Title"
                size="lg"
                label="Title"
                value={formData.Title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                University
              </Typography>
              <Select
                id="University"
                size="lg"
                label="Select University"
                value={formData.University}
                onChange={(value) =>
                  handleOnChange({
                    target: {
                      id: "University",
                      value,
                    },
                  })
                }
                // onChange={handleOnChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State">State</Option>
                <Option value="University">University</Option>
                <Option value="Department">Department</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sponsoring Authority
              </Typography>
              <Input
                id="Sponsoring_Authority"
                size="lg"
                label="Sponsoring Authority"
                value={formData.Sponsoring_Authority}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Participants
              </Typography>
              <Input
                id="No_of_Participants"
                size="lg"
                label="No. of Participants"
                type="number"
                value={formData.No_of_Participants}
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
                id="Start_Date_DD_MM_YYYY"
                size="lg"
                label="Start Date"
                type="date"
                value={formData.Start_Date_DD_MM_YYYY}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date(DD-MM-YYYY)
              </Typography>
              <Input
                id="End_Date_DD_MM_YYYY"
                size="lg"
                label="End Date"
                type="date"
                value={formData.End_Date_DD_MM_YYYY}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              List of Resource Persons
            </Typography>
            <Input
              id="List_of_Resource_Persons"
              size="lg"
              label="List of Resource Persons"
              value={formData.List_of_Resource_Persons}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Coordinator(s)
              </Typography>
              <Input
                id="Name_of_the_Coordinators"
                size="lg"
                label="Name of the Coordinator(s)"
                value={formData.Name_of_the_Coordinators}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Remarks
              </Typography>
              <Input
                id="Remarks"
                size="lg"
                label="Remarks"
                value={formData.Remarks}
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
                id="Sponsorship_Amount"
                size="lg"
                label="Sponsorship Amount"
                value={formData.Sponsorship_Amount}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Participants from PICT
              </Typography>
              <Input
                id="Number_of_participants_from_PICT"
                size="lg"
                label="Number of Participants from PICT"
                type="number"
                value={formData.Number_of_participants_from_PICT}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Number of Participants from outside PICT
            </Typography>
            <Input
              id="Number_of_participants_from_outside_PICT"
              size="lg"
              label="Number of Participants from outside PICT"
              type="number"
              value={formData.Number_of_participants_from_outside_PICT}
              onChange={handleOnChange}
            />
          </div>

          <Button className="mt-4" type="submit" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
