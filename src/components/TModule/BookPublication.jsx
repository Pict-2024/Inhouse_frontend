import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function BookPublication() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    facultyName: "",
    department: "",
    bookTitle: "",
    chapter: "",
    level: "",
    publisher: "",
    year: "",
    otherInfo: "",
    proof: null,
  });

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
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
          Book Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Faculty Name
              </Typography>
              <Input
                id="facultyName"
                size="lg"
                placeholder="Name of Faculty"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.facultyName}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                id="department"
                size="lg"
                placeholder="Department"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.department}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Book Title
              </Typography>
              <Input
                id="bookTitle"
                size="lg"
                placeholder="Title of book"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.bookTitle}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Chapter (if any)
              </Typography>
              <Input
                id="chapter"
                size="lg"
                placeholder="Chapter"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.chapter}
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
                id="level"
                size="lg"
                placeholder="Select Level"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.level}
                onChange={handleOnChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Publisher
              </Typography>
              <Input
                id="publisher"
                size="lg"
                placeholder="Publisher"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.publisher}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year
              </Typography>
              <Select
                id="year"
                size="lg"
                placeholder="Select Year"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.year}
                onChange={handleOnChange}
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
                ISBN/ISSN/DOI/any other
              </Typography>
              <Input
                id="otherInfo"
                size="lg"
                placeholder="Author"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                value={formData.otherInfo}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Proof
              </Typography>
              <Input
                id="proof"
                size="lg"
                type="file"
                placeholder="Financial support from institute in INR"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
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
