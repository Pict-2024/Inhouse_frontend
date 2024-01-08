import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { addRecordsIndustrial } from "./API_Routes";

export default function IndustrialVisit() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    T_ID:null,
    Username:currentUser?.Email,
    Department: "",
    Name_Of_Industry_Visited: "",
    Purpose_of_the_visit: "",
    No_of_Students: "",
    Date_of_visit: "",
    Coordinator: "",
    Finance_Support_By_PICT: "",
    Report: "",
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
    const response = await axios.post(addRecordsIndustrial, formData);
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
          Industrial Visits / Tours / Field Trip
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                name="Department"
                value={formData.Department}
                label="Department"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name and address of the Company / Industry visited
              </Typography>
              <Input
                size="lg"
                name="Name_Of_Industry_Visited"
                value={formData.Name_Of_Industry_Visited}
                label="Name and address of the Company / Industry visited"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Purpose of the visit
              </Typography>
              <Input
                size="lg"
                name="Purpose_of_the_visit"
                value={formData.Purpose_of_the_visit}
                label="Purpose of the visit"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                No. of Students
              </Typography>
              <Input
                size="lg"
                name="No_of_Students"
                value={formData.No_of_Students}
                label="No. of Students"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of visit (DD-MM-YYYY)
              </Typography>
              <Input
                size="lg"
                name="Date_of_visit"
                value={formData.Date_of_visit}
                label="Date of visit"
                type="date"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Coordinator(s)
              </Typography>
              <Input
                size="lg"
                name="Coordinator"
                value={formData.Coordinator}
                label="Coordinator(s)"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support from PICT
              </Typography>
              <Input
                size="lg"
                name="Finance_Support_By_PICT"
                value={formData.Finance_Support_By_PICT}
                label="Financial support from PICT"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Report with approval application
            </Typography>
            <Input
              size="lg"
              name="Report"
              value={formData.Report}
              label="Report with approval application"
              onChange={handleChange}
            />
          </div>

          <Button className="mt-4" fullWidth type="submit">
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
