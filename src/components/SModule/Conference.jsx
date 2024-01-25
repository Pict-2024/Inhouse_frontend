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

import { addRecordsConferenceStud } from "./API_Routes";

export default function Conference() {
  const { currentUser } = useSelector((state) => state.user);

  const [isFinancialSupport, setIsFinancialSupport] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Department: "",
    Year_of_Study: "",
    Title_of_Paper: "",
    Title_of_proceedings_of_conference: "",
    Conference_Name: "",
    Level: "",
    Date_of_Conference: "",
    Conference_Venue_and_Organizer: "",
    Publication_Year: "",
    ISSN: "",
    Affiliating_Institute: "",
    Paper_Link: null,
    Upload_Paper: null,
    Financial_support_given_by_institute_in_INR: "",
    Evidence: "",
    DOI: "",
    Presented: "",
    Achievements: "",
    Upload_Achievement_Document: null,
  });

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
    });
  };

  //Add records
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsConferenceStud, formData);
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
    navigate("/s/data");
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
          Student Conference Publication
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
                DOI
              </Typography>
              <Input
                id="DOI"
                size="lg"
                type="date"
                value={formData.DOI}
                label="DOI"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Paper
              </Typography>
              <Input
                id="Title_of_Paper"
                size="lg"
                label="Title of Paper"
                value={formData.Title_of_Paper}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of proceedings of conference
              </Typography>
              <Input
                id="Title_of_proceedings_of_conference"
                size="lg"
                label="Title of proceedings of conference"
                value={formData.Title_of_proceedings_of_conference}
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
                label="Select"
                value={formData.Level}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Level", value },
                  })
                }
                // onChange={handleOnChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Conference Name
              </Typography>
              <Input
                id="Conference_Name"
                size="lg"
                label="Conference Name"
                value={formData.Conference_Name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                id="ISSN"
                size="lg"
                label="ISSN"
                value={formData.ISSN}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Affiliating Institute
              </Typography>
              <Input
                id="Affiliating_Institute"
                size="lg"
                label="Affiliating Institute"
                value={formData.Affiliating_Institute}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year_of_Publication
              </Typography>
              <Select
                id="Publication_Year"
                size="lg"
                label="Select Year_of_Publication"
                color="light-gray"
                value={formData.Publication_Year}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Publication_Year", value },
                  })
                }
                // onChange={handleOnChange}
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
                Conference Venue and Organizer
              </Typography>
              <Input
                id="Conference_Venue_and_Organizer"
                size="lg"
                label="Conference Venue and Organizer"
                value={formData.Conference_Venue_and_Organizer}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Paper Link
              </Typography>
              <Input
                id="Paper_Link"
                size="lg"
                type="text"
                label="Paper Link"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload_Paper
              </Typography>
              <Input
                id="Upload_Paper"
                size="lg"
                type="file"
                label=""
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="px-4 mb-4 flex justify-start items-center gap-4">
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
            <div className="flex justify-between  flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Input
                  size="lg"
                  label="Amount in INR"
                  name="Financial_support_given_by_institute_in_INR"
                  type="number"
                  value={formData.Financial_support_given_by_institute_in_INR}
                  onChange={handleOnChange}
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
                  onChange={handleOnChange}
                  disabled={!isFinancialSupport}
                />
              </div>
            </div>
          </div>
        </div>
            
            <div className="mb-4 flex flex-wrap -mx-4">
            
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
              Date_of_Conference
              </Typography>
              <Input
                id="Date_of_Conference"
                size="lg"
                type="date"
                value={formData.Date_of_Conference}
                label="Date_of_Conference"
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Presented
              </Typography>
              <Input
                id="Presented"
                size="lg"
                value={formData.Presented}
                label="Presented"
                onChange={handleOnChange}
              />
            </div>
          </div>
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Achievements
                </Typography>
                <Input
                  id="Achievements"
                  size="lg"
                  value={formData.Achievements}
                  label="Achievements"
                  onChange={handleOnChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Achievement Document
                </Typography>
                <Input
                  id="Upload_Achievement_Document"
                  size="lg"
                  type="file"
                  label=""
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
