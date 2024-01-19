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

import { addRecordsMous } from "./API_Routes";

export default function FacultyExchange() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  // Define state variables for form fields
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    MoU_Collaboration_linkage_Name: "",
    Name_of_the_collaboration: "",
    Faculty_coordinator: "",
    Department: "",
    Year_of_signing: "",
    Duration: "",
    Objectives_Purpose: "",
    Actual_Activity_Under_MOU: "",
    Finance_Support_Transaction: "",
    Upload_Report: null,
  });

  // Add new record
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsMous, formData);
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
          Number of MoUs, collaborations / linkages for Faculty exchange
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Name of the MoU / Collaboration / Linkage
            </Typography>
            <Input
              size="lg"
              name="MoU_Collaboration_linkage_Name"
              value={formData.MoU_Collaboration_linkage_Name}
              onChange={handleChange}
              label="Name of the MoU / Collaboration / Linkage"
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Name of the collaborating agency / institution / industry /
              corporate house
            </Typography>
            <Input
              size="lg"
              name="Name_of_the_collaboration"
              value={formData.Name_of_the_collaboration}
              onChange={handleChange}
              label="Collaborating Agency / Institution"
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Faculty Coordinator
              </Typography>
              <Input
                size="lg"
                name="Faculty_coordinator"
                value={formData.Faculty_coordinator}
                onChange={handleChange}
                label="Faculty Coordinator"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                size="lg"
                name="Department"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleChange({
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
                Year of Signing MoU / Collaboration / Linkage
              </Typography>
              <Select
                size="lg"
                name="Year_of_signing"
                value={formData.Year_of_signing}
                onChange={handleChange}
                label="Select Year"
                color="light-gray"
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration of MoU / Collaboration / Linkage
              </Typography>
              <Input
                size="lg"
                name="Duration"
                value={formData.Duration}
                onChange={handleChange}
                label="Duration (in years)"
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Objectives/Purpose of MoU, Collaboration/Linkages
            </Typography>
            <Input
              size="lg"
              name="Objectives_Purpose"
              value={formData.Objectives_Purpose}
              onChange={handleChange}
              label="Objectives/Purpose"
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              List the Actual Activities under each MoU and Web-Links Year-wise
            </Typography>
            <Input
              size="lg"
              name="Actual_Activity_Under_MOU"
              value={formData.Actual_Activity_Under_MOU}
              onChange={handleChange}
              label="Activities and Web-Links"
            />
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Any Financial Support/Transaction
              </Typography>
              <Input
                size="lg"
                name="Finance_Support_Transaction"
                value={formData.Finance_Support_Transaction}
                onChange={handleChange}
                label="Financial Support/Transaction"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Report (Add drive link)
              </Typography>
              <Input
                size="lg"
                name="Upload_Report"
                type="text"
                onChange={handleChange}
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
