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

import { addRecordsFaculty } from "./API_Routes";

export default function FacultyConferencePublication() {
  const { currentUser } = useSelector((state) => state.user);

  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Username,
    Name:currentUser?.Name,
    Department: "",
    Title_of_the_Paper: "",
    Title_of_the_proceedings_of_the_conference: "",
    Name_of_the_conference: "",
    National_International: "",
    Date_of_conference: "",
    Conference_Venue_and_Organizer: "",
    Year_of_publication: "",
    ISSN_ISBN_number_of_the_proceeding: "",
    Affiliating_Institute_at_the_time_of_publication: "",
    Link_to_paper: "",
    Upload_Paper: null,
    Financial_support_given_by_institute_in_INR: "",
    Evidence:null,
    DOI: "",
    Presented_Yes_No: "",
    Any_Achievements: "",
    Upload_DOA: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  //Add records
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(addRecordsFaculty, formData);
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
          Faculty Conference Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                name="Department"
                size="lg"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleInputChange({
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
                Title of the Paper
              </Typography>
              <Input
                size="lg"
                label="Title of the Paper"
                type="text"
                onChange={handleInputChange}
                name="Title_of_the_Paper"
                value={formData.Title_of_the_Paper}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the proceedings of the conference
              </Typography>
              <Input
                size="lg"
                label="Title of the proceedings of the conference"
                type="text"
                onChange={handleInputChange}
                name="Title_of_the_proceedings_of_the_conference"
                value={formData.Title_of_the_proceedings_of_the_conference}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the conference
              </Typography>
              <Input
                size="lg"
                label="Name of the conference"
                type="text"
                onChange={handleInputChange}
                name="Name_of_the_conference"
                value={formData.Name_of_the_conference}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                size="lg"
                label="Select level"
                // onChange={handleInputChange}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "National_International", value },
                  })
                }
                name="National_International"
                value={formData.National_International}
              >
                <Option value="National">National</Option>
                <Option value="International">International</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date of conference
              </Typography>
              <Input
                size="lg"
                type="date"
                label="date of conference "
                onChange={handleInputChange}
                name="Date_of_conference"
                value={formData.Date_of_conference}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Conference Venue and Organizer
              </Typography>
              <Input
                size="lg"
                label="Conference Venue and Organizer"
                onChange={handleInputChange}
                type="text"
                name="Conference_Venue_and_Organizer"
                value={formData.Conference_Venue_and_Organizer}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of publication
              </Typography>
              <Select
                size="lg"
                label="Select Year"
                color="light-gray"
                // onChange={handleInputChange}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Year_of_publication", value },
                  })
                }
                name="Year_of_publication"
                value={formData.Year_of_publication}
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
                ISSN/ISBN number of the proceeding
              </Typography>
              <Input
                size="lg"
                label="ISSN/ISBN number of the proceeding"
                onChange={handleInputChange}
                name="ISSN_ISBN_number_of_the_proceeding"
                value={formData.ISSN_ISBN_number_of_the_proceeding}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Affiliating Institute at the time of publication
              </Typography>
              <Input
                size="lg"
                label="Affiliating Institute at the time of publication"
                onChange={handleInputChange}
                name="Affiliating_Institute_at_the_time_of_publication"
                value={
                  formData.Affiliating_Institute_at_the_time_of_publication ||
                  "PICT"
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to paper
              </Typography>
              <Input
                size="lg"
                label="Link to paper"
                type="file"
                onChange={handleInputChange}
                name="Link_to_paper"
                value={formData.Link_to_paper}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Paper
              </Typography>
              <Input
                size="lg"
                type="file"
                label="Upload Paper"
                onChange={handleInputChange}
                name="Upload_Paper"
                value={formData.Upload_Paper}
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
                    name="Financial_support_given_by_institute_in_INR"
                    type="number"
                    value={formData.Financial_support_given_by_institute_in_INR}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                DOI
              </Typography>
              <Input
                size="lg"
                label="DOI"
                onChange={handleInputChange}
                name="DOI"
                value={formData.DOI}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Presented (Yes/No)
              </Typography>
              <Select
                size="lg"
                label="Select Yes/No"
                color="light-gray"
                // onChange={handleInputChange}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Presented_Yes_No", value },
                  })
                }
                name="Presented_Yes_No"
                value={formData.Presented_Yes_No}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Any Achievements
              </Typography>
              <Select
                size="lg"
                label="Any Achievements"
                name="Any_Achievements"
                value={formData.Any_Achievements}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Any_Achievements", value },
                  })
                }
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Achievement Document
              </Typography>
              <Input
                size="lg"
                type="file"
                label="Upload Achievement Document"
                onChange={handleInputChange}
                name="Upload_DOA"
                value={formData.Upload_DOA}
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
