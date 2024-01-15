import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SportData() {
  // const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Email,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: "",
    Department: "",
    Year: "",
    Participant_or_Organizer_for_the_Event: "",
    Sport_Name: "",
    Sub_Event_Name: "",
    Sport_Type: "",
    Activity_Type: "",
    Organizer_Name: "",
    Level: "",
    Place: "",
    Start_Date: "",
    End_Date: "",
    Award: "",
    Financial_Support_given_by_Institute_in_INR: "",
    Geo_Tag_Photos: "",
    Certificates: null,
    Award_Prize_Money: "",
    Remark: "",
  });

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post(, formData);
    // navigate("/t/data");
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
          Sport Data
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
                Academic Year
              </Typography>
              <Input
                id="Academic_Year"
                size="lg"
                label="Eg.2022-2023"
                value={formData.Academic_Year}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of Study
              </Typography>
              <Select
                id="Year"
                size="lg"
                label="Year"
                value={formData.Year_of_Study}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Year_of_Study", value },
                  })
                }
              >
                <Option value="FE">FE</Option>
                <Option value="SE">SE</Option>
                <Option value="TE">TE</Option>
                <Option value="BE">BE</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Roll No
              </Typography>
              <Input
                id="Roll_No"
                size="lg"
                label="Roll No"
                value={formData.Roll_No}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sport Name
              </Typography>
              <Input
                id="Sport_Name"
                size="lg"
                label="Organized Byr"
                value={formData.Sport_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Participant or Organizer
              </Typography>
              <Input
                id="Participant_or_Organizer_for_the_Event"
                size="lg"
                label="Certificate Course Title"
                value={formData.Participant_or_Organizer_for_the_Event}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sub Event Name
              </Typography>
              <Input
                id="Sub_Event_Name"
                size="lg"
                label="Sub Event Name"
                value={formData.Sub_Event_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sport Type
              </Typography>
              <Input
                id="Sport_Type"
                size="lg"
                label="Sport Type"
                value={formData.Sport_Type}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Activity Type
              </Typography>
              <Select
                id="Activity_Type"
                size="lg"
                label="Activity Type"
                value={formData.Activity_Type}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Activity_Type", value },
                  })
                }
              >
                <Option value="Teamwork">Teamwork</Option>
                <Option value="Individual">Individual</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Organizer Name
              </Typography>
              <Input
                id="Organizer_Name"
                size="lg"
                label="Organizer_Name"
                value={formData.Organizer_Name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
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
                    target: { id: "Level", value },
                  })
                }
              >
                <Option value="National">National</Option>
                <Option value="International">International</Option>
                <Option value="InterCollege">InterCollege</Option>
                <Option value="IntraCollege">IntraCollege</Option>
                <Option value="University">University</Option>
                <Option value="State">State</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Place
              </Typography>
              <Input
                id="Place"
                size="lg"
                label="Place"
                value={formData.Place}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date
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
                End Date
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
                Financial Support given by Institute_in_INR
              </Typography>
              <Input
                id="Financial_Support_given_by_Institute_in_INR"
                size="lg"
                label="Financial Support given by Institute_in_INR"
                value={formData.Financial_Support_given_by_Institute_in_INR}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award
              </Typography>
              <Input
                id="Award"
                size="lg"
                label="Award"
                value={formData.Award}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
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
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award_Prize_Money
              </Typography>
              <Input
                id="Award_Prize_Money"
                size="lg"
                label="Award_Prize_Money"
                value={formData.Award_Prize_Money}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Completion Certificate (drive link)
              </Typography>
              <Input
                id="Certificates"
                size="lg"
                label="Completion Certificate"
                type="text"
                value={formData.Certificates}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Geo Tag Photos
              </Typography>
              <Input
                id="Geo_Tag_Photos"
                size="lg"
                label="Geo Tag Photos"
                value={formData.Geo_Tag_Photos}
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
