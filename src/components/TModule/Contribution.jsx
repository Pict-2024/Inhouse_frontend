import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function Contribution() {
  const [formData, setFormData] = useState({
    // teacherName: "",
    department: "",
    academicYear: "",
    teacherParticipated: "",
    role: "",
    university: "",
    bodyName: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          Contribution to BoS
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Teacher
              </Typography>
              <Input
                size="lg"
                name="teacherName"
                value={formData.teacherName}
                placeholder="Name of Teacher"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleOnChange}
              />
            </div> */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                name="department"
                value={formData.department}
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Academic Year
              </Typography>
              <Input
                size="lg"
                name="academicYear"
                value={formData.academicYear}
                placeholder="Academic Year"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of teacher participated
              </Typography>
              <Input
                size="lg"
                name="teacherParticipated"
                value={formData.teacherParticipated}
                placeholder="Name of teacher participated"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Input
                size="lg"
                name="role"
                value={formData.role}
                placeholder="Role"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                University/Institution
              </Typography>
              <Input
                size="lg"
                name="university"
                value={formData.university}
                placeholder="University/Institution"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Name of the body in which full-time teacher participated
            </Typography>
            <Input
              size="lg"
              name="bodyName"
              value={formData.bodyName}
              placeholder="Name of the body"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleOnChange}
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
