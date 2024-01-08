import {  useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { addRecordsResearch } from "./API_Routes";
import axios from "axios";

export default function Research() {
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
    Title_of_Research_Article: "",
    Type_Research_Review: "",
    Level_International_National_State_University: "",
    Indexed_SCI_Scopus_Web_of_Science_UGC_Others: "",
    Date: "",
    Author: "",
    Affiliation_at_the_Time_of_Publication: "",
    Role_First_Author_Second_Author_Third_Author: "",
    Publisher: "",
    Co_Authors: "",
    Journal_Name: "",
    ISSN: "",
    Volume: "",
    Page_Numbers: "",
    Issue: "",
    Year: "",
    DOI: "",
    Financial_support_from_institute_in_INR: "",
    LInk_to_article_paper_abstract_of_the_article: "",
    Achievements_if_any: "",
    Upload_the_Paper: null,
    Upload_Document_of_Achievement: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  //Add records
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("FormData: ", formData);
    const response = await axios.post(addRecordsResearch, formData);
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
          Research Publication
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
                name="Department"
                value={formData.Department}
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
                label="Title of Research Article"
                name="Title_of_Research_Article"
                value={formData.Title_of_Research_Article}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type
              </Typography>
              <Input
                size="lg"
                label="Type (Research/Review)"
                name="Type_Research_Review"
                value={formData.Type_Research_Review}
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
                label="Level"
                name="Level_International_National_State_University"
                value={formData.Level_International_National_State_University}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Level_International_National_State_University",
                      value,
                    },
                  })
                }
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
                label="Select Selection"
                color="light-gray"
                name="Indexed_SCI_Scopus_Web_of_Science_UGC_Others"
                value={formData.indexed}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Indexed_SCI_Scopus_Web_of_Science_UGC_Others",
                      value,
                    },
                  })
                }
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
                label="Date"
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Author
              </Typography>
              <Input
                size="lg"
                label="Author"
                name="Author"
                value={formData.Author}
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
                label="Affiliation at the Time of Publication"
                name="Affiliation_at_the_Time_of_Publication"
                value={formData.Affiliation_at_the_Time_of_Publication}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Select
                size="lg"
                label="Select Role"
                color="light-gray"
                name="Role_First_Author_Second_Author_Third_Author"
                value={formData.Role_First_Author_Second_Author_Third_Author}
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Role_First_Author_Second_Author_Third_Author",
                      value,
                    },
                  })
                }
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
                label="Publisher"
                name="Publisher"
                value={formData.Publisher}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co-Author(s)
              </Typography>
              <Input
                size="lg"
                label="Co-Author"
                name="Co_Authors"
                value={formData.Co_Authors}
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
                label="Journal Name"
                name="Journal_Name"
                value={formData.Journal_Name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                size="lg"
                label="ISSN"
                name="ISSN"
                value={formData.ISSN}
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
                label="Volume"
                name="Volume"
                value={formData.Volume}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Page Numbers
              </Typography>
              <Input
                size="lg"
                label="Page Numbers"
                name="Page_Numbers"
                value={formData.Page_Numbers}
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
                label="Issue"
                name="Issue"
                value={formData.Issue}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year
              </Typography>
              <Select
                size="lg"
                label="Select Year"
                color="light-gray"
                name="Year"
                value={formData.Year}
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({ target: { name: "Year", value } })
                }
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
                label="DOI"
                name="DOI"
                value={formData.DOI}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support from institute in INR
              </Typography>
              <Input
                size="lg"
                label="Financial support from institute in INR"
                name="Financial_support_from_institute_in_INR"
                value={formData.Financial_support_from_institute_in_INR}
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
                label="Link to article / paper / abstract of the article"
                name="LInk_to_article_paper_abstract_of_the_article"
                value={formData.LInk_to_article_paper_abstract_of_the_article}
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
                label="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="Upload_the_Paper"
                value={formData.Upload_the_Paper}
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
                label="Achievements if any  "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="Achievements_if_any"
                value={formData.Achievements_if_any}
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
                label="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="Upload_Document_of_Achievement"
                value={formData.Upload_Document_of_Achievement}
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
