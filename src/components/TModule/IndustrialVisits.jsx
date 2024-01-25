import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsIndustrial } from "./API_Routes";

export default function IndustrialVisit() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Name:currentUser?.Name,
    Department: "",
    Name_Of_Industry_Visited: "",
    Purpose_of_the_visit: "",
    No_of_Students: "",
    List_of_Students: null,
    Date_of_visit: "",
    Coordinator: "",
    Finance_Support_By_PICT: "",
    Evidence: null,
    Upload_Report: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsIndustrial, formData);
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
          Industrial Visits / Tours / Field Trip
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
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
                Coordinator(s)
              </Typography>
              <Input
                size="lg"
                name="Coordinator"
                type="text"
                value={formData.Coordinator}
                label="Coordinator(s)"
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
                List of Students
              </Typography>
              <Input
                size="lg"
                name="List_of_Students"
                value={formData.List_of_Students}
                type="file"
                label="List of Students"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Financial support from institute in INR
                </Typography>
                <div className="flex gap-3">
                  <label className="mx-2">
                    <input
                      type="radio"
                      name="financialSupport"
                      value="yes"
                      checked={isFinancialSupport}
                      onChange={() => setIsFinancialSupport(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="financialSupport"
                      value="no"
                      checked={!isFinancialSupport}
                      onChange={() => setIsFinancialSupport(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Amount in INR"
                    name="Finance_support_amount_INR"
                    type="number"
                    value={formData.Finance_support_amount_INR}
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    name="Evidence"
                    type="file"
                    value={formData.Evidence}
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Report with approval application
              </Typography>
              <Input
                size="lg"
                name="Upload_Report"
                type="file"
                value={formData.Upload_Report}
                label="Report with approval application"
                onChange={handleChange}
              />
            </div>
          </div>

          <Button className="mt-4" fullWidth type="submit">
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
