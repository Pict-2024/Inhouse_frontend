import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { addRecordsFaculty } from "./API_Routes";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FacultyConferencePublication() {
  const { currentUser } = useSelector((state) => state.user);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    T_ID: null,
    Username: currentUser?.Email,
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
    DOI: "",
    Presented_Yes_No: "",
    Any_Achievements: "",
    Upload_Achievement_Document: "",
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
    console.log("FormData: ", formData);
    const response = await axios.post(addRecordsFaculty, formData);
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
          Faculty Conference Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                label="Department"
                onChange={handleInputChange}
                name="Department"
                value={formData.Department}
              />
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
                onChange={handleInputChange}
                name="Name_of_the_conference"
                value={formData.Name_of_the_conference}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                National / International
              </Typography>
              <Select
                size="lg"
                label="Select National/International"
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
                  formData.Affiliating_Institute_at_the_time_of_publication
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
                onChange={handleInputChange}
                name="Link_to_paper"
                value={formData.Link_to_paper}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Paper
              </Typography>
              <Input
                size="lg"
                type="text"
                label="Upload Paper"
                onChange={handleInputChange}
                name="Upload_Paper"
                value={formData.Upload_Paper}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support given by institute in INR
              </Typography>
              <Input
                size="lg"
                label="Financial support given by institute in INR"
                onChange={handleInputChange}
                name="Financial_support_given_by_institute_in_INR"
                value={formData.Financial_support_given_by_institute_in_INR}
              />
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
              <Input
                size="lg"
                label="Any Achievements"
                onChange={handleInputChange}
                name="Any_Achievements"
                value={formData.Any_Achievements}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Achievement Document(Add drive link)
              </Typography>
              <Input
                size="lg"
                type="text"
                label="Upload Achievement Document"
                onChange={handleInputChange}
                name="Upload_Achievement_Document"
                value={formData.Upload_Achievement_Document}
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
