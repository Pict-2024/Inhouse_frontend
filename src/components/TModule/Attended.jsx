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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addRecordsAttended } from "./API_Routes";

export default function Attended() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    T_ID: null,
    UserName: currentUser?.UserName,
    Name: currentUser?.Name,
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
    Evidence: null,
    Upload_Certificate: null,
  });

  // const handleFileUpload = async (file) => {
  //   try {
  //     const formDataForFile = new FormData();
  //     formDataForFile.append("file", file);
  //     formDataForFile.append("username", currentUser?.Username);
  //     formDataForFile.append("role", currentUser?.Role);
  //     formDataForFile.append("tableName", "book_publication");

  //     const response = await axios.post(uploadRecordsBook, formDataForFile);
  //     console.log("file response:", response.data.filePath);

  //     // Assuming the file upload API returns the file path in response.data.path
  //     setFileUploadPath(response.data.filePath);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     // Handle error as needed
  //   }
  // };

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
    await axios.post(addRecordsAttended, formData);
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
          STTP/FDP/Workshop/Conference Attended
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
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
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the Event
              </Typography>
              <Input
                id="Title_of_the_Event"
                size="lg"
                type="text"
                label="Title of the Event"
                value={formData.Title_of_the_Event}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type/Nature (FDP/STTP/Workshop/Conference etc)
              </Typography>
              <Select
                id="Type_Nature"
                size="lg"
                label="Type/Nature"
                value={formData.Type_Nature}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Type_Nature", value },
                  })
                }
              >
                <Option value="FDP">FDP</Option>
                <Option value="STTP">STTP</Option>
                <Option value="Workshop">Workshop</Option>
                <Option value="Webinar">Webinar</Option>
                <Option value="Conference">Conference</Option>
                <Option value="Other">Other</Option>
              </Select>
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
                type="text"
                label="Organizing Institute"
                value={formData.Organizer_Institute_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the coordinator from organizing Institute
              </Typography>
              <Input
                id="Name_of_Coordinators"
                size="lg"
                type="text"
                label="Name of the coordinator"
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
                  handleOnChange({
                    target: { id: "Mode_Online_Physical", value },
                  })
                }
              >
                <Option value="Online">Online</Option>
                <Option value="Physical">Physical</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Duration in Hours
              </Typography>
              <Input
                id="Duration_in_Days"
                size="lg"
                type="text"
                label="Duration"
                value={formData.Duration_in_Days}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4 ">
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40 ">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Financial support from institute in INR
                </Typography>
                <div className="flex gap-3 ">
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
              <div className="flex justify-between border-2">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Amount in INR"
                    name="Financial_support_amount_INR"
                    type="number"
                    value={formData.Financial_Support_By_PICT}
                    onChange={handleOnChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
                {/* <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    name="Evidence"
                    type="file"
                    value={formData.Evidence}
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div> */}
                <div className="w-full md:w-1/2 px-4 mb-4 flex gap-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    name="Evidence"
                    type="file"
                    value={formData.Evidence}
                    onChange={handleOnChange}
                    disabled={!isFinancialSupport}
                  />
                  <Button color="dark" size="md">
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Certificate
              </Typography>
              <Input
                id="Upload_Certificate"
                label="Upload certificate"
                size="lg"
                type="file"
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
