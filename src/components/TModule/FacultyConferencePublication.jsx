import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function FacultyConferencePublication() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    department: "",
    titleOfThePaper: "",
    titleOfTheProceedings: "",
    nameOfTheConference: "",
    nationalOrInternational: "",
    dateOfConference: "",
    conferenceVenueAndOrganizer: "",
    yearOfPublication: "",
    issnIsbnNumber: "",
    affiliatingInstitute: "",
    linkToPaper: "",
    uploadPaper: null,
    financialSupportByInstitute: "",
    doi: "",
    presented: "",
    anyAchievements: "",
    uploadAchievementDocument: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name the Teacher
              </Typography>
              <Input
                size="lg"
                placeholder="Name the Teacher"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div> */}
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.department}
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
                placeholder="Title of the Paper"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.titleOfThePaper}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the proceedings of the conference
              </Typography>
              <Input
                size="lg"
                placeholder="Title of the proceedings of the conference"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.titleOfTheProceedings}
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
                placeholder="Name of the conference"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.nameOfTheConference}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                National / International
              </Typography>
              <Select
                size="lg"
                placeholder="Select National/International"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.nationalOrInternational}
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
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.dateOfConference}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Conference Venue and Organizer
              </Typography>
              <Input
                size="lg"
                placeholder="Conference Venue and Organizer"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.conferenceVenueAndOrganizer}
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
                placeholder="Select Year"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.yearOfPublication}
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
                placeholder="ISSN/ISBN number of the proceeding"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.issnIsbnNumber}
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
                placeholder="Affiliating Institute at the time of publication"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.affiliatingInstitute}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to paper
              </Typography>
              <Input
                size="lg"
                placeholder="Link to paper"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.linkToPaper}
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
                placeholder="Upload Paper"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.uploadPaper}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support given by institute in INR
              </Typography>
              <Input
                size="lg"
                placeholder="Financial support given by institute in INR"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.financialSupportByInstitute}
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
                placeholder="DOI"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.doi}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Presented (Yes/No)
              </Typography>
              <Select
                size="lg"
                placeholder="Select Yes/No"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.presented}
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
                placeholder="Any Achievements"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.anyAchievements}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Achievement Document(Add drive link)
              </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Upload Achievement Document"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
                value={formData.uploadAchievementDocument}
              />
            </div>
          </div>

          <Button className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
