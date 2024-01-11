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
import axios from "axios";
import { addRecordsBook } from "./API_Routes";


export default function BookPublication() {

  const { currentUser } = useSelector((state) => state.user);
  
  
    const [formData, setFormData] = useState({
      T_ID: null,
      Username: currentUser?.Email,
      Department: "",
      Book_Title: "",
      Chapter_if_any: "",
      Level_International_National: "",
      Publisher: "",
      Year_of_Publication: "",
      ISBN_ISSN_DOI_any_other: "",
      Proof: null,
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
    const response = await axios.post(addRecordsBook, formData);
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
          Book Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                id="Department"
                size="lg"
                label="Department"
                value={formData.Department}
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
                id="Book_Title"
                size="lg"
                label="Title of book"
                value={formData.Book_Title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Chapter (if any)
              </Typography>
              <Input
                id="Chapter_if_any"
                size="lg"
                label="Chapters"
                value={formData.Chapter_if_any}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level_International_National
              </Typography>
              <Select
                id="Level_International_National"
                size="lg"
                label="Select Level_International_National"
                value={formData.Level_International_National}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Level_International_National", value },
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
                Publisher
              </Typography>
              <Input
                id="Publisher"
                size="lg"
                label="Publisher"
                value={formData.Publisher}
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
                id="Year_of_Publication"
                size="lg"
                label="Select Year_of_Publication"
                color="light-gray"
                value={formData.Year_of_Publication}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Year_of_Publication", value },
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
                ISBN/ISSN/DOI/any other
              </Typography>
              <Input
                id="ISBN_ISSN_DOI_any_other"
                size="lg"
                label="Author"
                value={formData.ISBN_ISSN_DOI_any_other}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Proof (Add drive link)
              </Typography>
              <Input
                id="Proof"
                size="lg"
                type="text"
                label="Financial support from institute in INR"
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
