import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Research() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    // nameOfFaculty: "",
    department: "",
    titleOfResearchArticle: "",
    type: "",
    level: "",
    indexed: "",
    date: "",
    author: "",
    affiliation: "",
    role: "",
    publisher: "",
    coAuthors: "",
    journalName: "",
    issn: "",
    volume: "",
    pageNumbers: "",
    issue: "",
    year: "",
    doi: "",
    financialSupport: "",
    linkToArticle: "",
    achievements: "",
    paper: null,
    achievementsPaper: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data here and perform further actions, like submitting it to the server
    console.log(formData);
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
          Research Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            {/* <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Faculty
              </Typography>
              <Input
                size="lg"
                placeholder="Name of Faculty"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="nameOfFaculty"
                value={formData.nameOfFaculty}
                onChange={handleChange}
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
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Research Article
              </Typography>
              <Input
                size="lg"
                placeholder="Title of Research Article"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="titleOfResearchArticle"
                value={formData.titleOfResearchArticle}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type (Research/Review)
              </Typography>
              <Input
                size="lg"
                placeholder="Type (Research/Review)"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                size="lg"
                placeholder="Select Level"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State University">State University</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Indexed
              </Typography>
              <Select
                size="lg"
                placeholder="Select Selection"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="indexed"
                value={formData.indexed}
                onChange={handleChange}
              >
                <Option value="SCI">SCI</Option>
                <Option value="Scopus">Scopus</Option>
                <Option value="Web of Science">Web of Science</Option>
                <Option value="UGC">UGC</Option>
                <Option value="Others">Others</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date
              </Typography>
              <Input
                size="lg"
                placeholder="Date"
                type="date"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Author
              </Typography>
              <Input
                size="lg"
                placeholder="Author"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Affiliation at the Time of Publication
              </Typography>
              <Input
                size="lg"
                placeholder="Affiliation at the Time of Publication"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Select
                size="lg"
                placeholder="Select Role"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <Option value="First Author">First Author</Option>
                <Option value="Second Author">Second Author</Option>
                <Option value="Third Author">Third Author</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Publisher
              </Typography>
              <Input
                size="lg"
                placeholder="Publisher"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co-Author(s)
              </Typography>
              <Input
                size="lg"
                placeholder="Co-Author"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="coAuthors"
                value={formData.coAuthors}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Journal Name
              </Typography>
              <Input
                size="lg"
                placeholder="Journal Name"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="journalName"
                value={formData.journalName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                size="lg"
                placeholder="ISSN"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="issn"
                value={formData.issn}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Volume
              </Typography>
              <Input
                size="lg"
                placeholder="Volume"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Page Numbers
              </Typography>
              <Input
                size="lg"
                placeholder="Page Numbers"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="pageNumbers"
                value={formData.pageNumbers}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Issue
              </Typography>
              <Input
                size="lg"
                placeholder="Issue"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year
              </Typography>
              <Select
                size="lg"
                placeholder="Select Year"
                color="light-gray"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
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
                name="doi"
                value={formData.doi}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support from institute in INR
              </Typography>
              <Input
                size="lg"
                placeholder="Financial support from institute in INR"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="financialSupport"
                value={formData.financialSupport}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to article / paper / abstract of the article
              </Typography>
              <Input
                size="lg"
                placeholder="Link to article / paper / abstract of the article"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                name="linkToArticle"
                value={formData.linkToArticle}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload the Paper
              </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="paper"
                value={formData.paper}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievements if any
              </Typography>
              <Input
                size="lg"
                placeholder="Achievements if any  "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Document of Achievement
              </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="achievementPaper"
                value={formData.achievementPaper}
                onChange={handleChange}
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
