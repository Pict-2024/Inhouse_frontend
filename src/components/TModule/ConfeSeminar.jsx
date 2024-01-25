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

import { addRecordsConference } from "./API_Routes";

export default function ConfeSeminar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Name:currentUser?.Name,
    Department: "",
    Title: "",
    Level: "",
    Activity_Event: "",
    Sponsoring_Authority: "",
    No_of_Participants: "",
    Start_Date: "",
    End_Date: "",
    Mode: "",
    List_of_Resource_Persons: "",
    Name_of_the_Coordinators: "",
    Remarks: "",
    Sponsorship_Amount: "",
    Evidence: "",
    NoOf_PICT_Participants: "",
    List_of_Students: "",
    NoOf_Non_PICT_Participants: "",
    List_of_Students_Outside: "",
    Sample_Certificate: null,
    Report: null,
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
    <>
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-85 mx-auto p-2 my-2 rounded-md overflow-x-hidden"
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
                Activity
              </Typography>
              <Select
                id="Activity_Event"
                value={formData.Activity_Event}
                color="blueGray"
                size="lg"
                label="Select an activity"
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Activity_Event", value },
                  })
                }
              >
                <Option value="Conference">Conference</Option>
                <Option value="Seminar">Seminar</Option>
                <Option value="Webinar">Webinar</Option>
                <Option value="STTP">STTP</Option>
                <Option value="FDP">FDP</Option>
                <Option value="FOP">FOP</Option>
              </Select>
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
                Level
              </Typography>
              <Select
                id="Level"
                size="lg"
                label="Select Level"
                value={formData.Level}
                onChange={(value) =>
                  handleOnChange({
                    target: {
                      id: "Level",
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
                <Option value="College">College</Option>
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
                id="Start_Date"
                size="lg"
                label="Start Date"
                type="date"
                value={formData.Start_Date}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date(DD-MM-YYYY)
              </Typography>
              <Input
                id="End_Date"
                size="lg"
                label="End Date"
                type="date"
                value={formData.End_Date}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mode
              </Typography>
              <Select
                id="Mode"
                size="lg"
                label="Select mode"
                value={formData.Mode}
                onChange={handleOnChange}
              >
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </div>
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
                Evidence of sponsor amount
              </Typography>
              <Input
                id="Evidence"
                size="lg"
                label="Evidence of sponsor amount"
                value={formData.Evidence}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Participants from PICT
              </Typography>
              <Input
                id="NoOf_PICT_Participants"
                size="lg"
                label="Number of Participants from PICT"
                type="number"
                value={formData.NoOf_PICT_Participants}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of no of students from PICT
              </Typography>
              <Input
                id="List_of_Students"
                size="lg"
                type="file"
                label=" List of no of students"
                value={formData.List_of_Students}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Number of Participants from outside PICT
              </Typography>
              <Input
                id="NoOf_Non_PICT_Participants"
                size="lg"
                label="Number of Participants from outside PICT"
                type="number"
                value={formData.NoOf_Non_PICT_Participants}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of no of students
              </Typography>
              <Input
                id="List_of_Students_Outside"
                size="lg"
                type="file"
                label=" List of no of students"
                value={formData.List_of_Students_Outside}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sample Certificate document
              </Typography>
              <Input
                id="Sample_Certificate"
                size="lg"
                label="Sample Certificate document"
                type="file"
                value={formData.Sample_Certificate}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List of no of students outside PICT
              </Typography>
              <Input
                id="List_of_Students_Outside"
                size="lg"
                type="file"
                label=" List of no of students"
                value={formData.List_of_Students_Outside}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <Button className="mt-4" type="submit" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
