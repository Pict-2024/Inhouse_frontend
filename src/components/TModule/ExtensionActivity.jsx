import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import  axios  from 'axios';
import { addRecordsExtension } from "./API_Routes";

export default function ExtensionActivity() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    T_ID:null,
    Username:currentUser?.Email,
    deptName: "",
    title: "",
    startDate: "",
    endDate: "",
    activityTitle: "",
    schemeName: "",
    role: "",
    purpose: "",
    studentParticipants: "",
    facultyParticipants: "",
    attainedPOsPSOs: "",
    place: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const response = await axios.post(addRecordsExtension, formData);
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
          Extension Activity
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the Dept
              </Typography>
              <Input
                size="lg"
                name="deptName"
                value={formData.deptName}
                label="Name of the Dept"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                name="title"
                value={formData.title}
                label="Title"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Start Date
              </Typography>
              <Input
                size="lg"
                name="startDate"
                value={formData.startDate}
                label="Start Date"
                type="date"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                End Date
              </Typography>
              <Input
                size="lg"
                name="endDate"
                value={formData.endDate}
                label="End Date"
                type="date"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of extension activity
              </Typography>
              <Input
                size="lg"
                name="activityTitle"
                value={formData.activityTitle}
                label="Title of extension activity"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the scheme
              </Typography>
              <Input
                size="lg"
                name="schemeName"
                value={formData.schemeName}
                label="Name of the scheme"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Input
                size="lg"
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Purpose of activity
              </Typography>
              <Input
                size="lg"
                name="purpose"
                value={formData.purpose}
                label="Purpose of activity"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of student participant
              </Typography>
              <Input
                size="lg"
                name="studentParticipants"
                value={formData.studentParticipants}
                label="No. of student participant"
                type="number"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of faculty participant/Contributed
              </Typography>
              <Input
                size="lg"
                name="facultyParticipants"
                value={formData.facultyParticipants}
                label="No. of faculty participant/Contributed"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                POs, PSOs attained through this activity
              </Typography>
              <Input
                size="lg"
                name="attainedPOsPSOs"
                value={formData.attainedPOsPSOs}
                label="POs, PSOs attained through this activity"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Place of the extension activity
            </Typography>
            <Input
              size="lg"
              name="place"
              value={formData.place}
              label="Place of the extension activity"
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
