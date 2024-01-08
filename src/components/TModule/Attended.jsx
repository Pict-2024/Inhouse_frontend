import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { addRecordsAttended } from "./API_Routes";

export default function Attended() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    T_ID: null,
    UserName: currentUser?.Email,
    Department: "",
    Title_of_the_Event: "",
    Type_Nature: "",
    Organizer_Institute_Name: "",
    Name_of_Coordinators: "",
    Start_Date: "",
    End_Date: "",
    Mode_Online_Physical: "",
    Duration_in_Days: "",
    Financial_Support_By_PICT: "",
    Upload_Certificate: null,
  });

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(addRecordsAttended, formData);
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
          STTP/FDP/Workshop/Conference Attended
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                id="Department"
                size="lg"
                label="Department"
                value={formData.Department}
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
                id="Title_of_the_Event"
                size="lg"
                label="Title of the Event"
                value={formData.Title_of_the_Event}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type/Nature (FDP/STTP/Workshop/Conference etc)
              </Typography>
              <Input
                id="Type_Nature"
                size="lg"
                label="Type/Nature"
                value={formData.Type_Nature}
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
                id="Organizer_Institute_Name"
                size="lg"
                label="Organizing Institute"
                value={formData.Organizer_Institute_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the coordinator(s)
              </Typography>
              <Input
                id="Name_of_Coordinators"
                size="lg"
                label="Coordinator(s)"
                value={formData.Name_of_Coordinators}
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
                id="Start_Date"
                size="lg"
                type="date"
                value={formData.Start_Date}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date (DD-MM-YYYY)
              </Typography>
              <Input
                id="End_Date"
                size="lg"
                type="date"
                value={formData.End_Date}
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
                id="Mode_Online_Physical"
                size="lg"
                label="Select Mode"
                value={formData.Mode_Online_Physical}
                onChange={(value) =>
                  handleOnChange({ target: { id: "Mode_Online_Physical", value } })
                }
                // onChange={handleOnChange}
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
                id="Duration_in_Days"
                size="lg"
                label="Duration"
                value={formData.Duration_in_Days}
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
                id="Financial_Support_By_PICT"
                size="lg"
                label="Finance Support Received from PICT"
                value={formData.Financial_Support_By_PICT}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Upload_Certificate(Add drive link)
              </Typography>
              <Input
                id="Upload_Certificate"
                size="lg"
                type="text"
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
