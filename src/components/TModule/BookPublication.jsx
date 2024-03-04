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

import { addRecordsBook, uploadRecordsBook } from "./API_Routes";

export default function BookPublication() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Book_Title: "",
    Chapter_if_any: "",
    Level_International_National: "",
    Publisher: "",
    Year: "",
    ISBN_ISSN_DOI_any_other: "",
    Upload_Paper: null,
  });

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const handleFileUpload = async (file) => {
    try {
      console.log("file as:", file);

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "book_publication");
      formDataForFile.append("columnName", "Upload_Paper");

      const response = await axios.post(uploadRecordsBook, formDataForFile);
      console.log(response);
      console.log("file response:", response?.data?.filePath);

      return response?.data?.filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
    }
  };

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;

    setFormData({
      ...formData,
      [id]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  //Add records
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    var pathUpload;
    console.log(formData.Upload_Paper);
    try {
      if (formData.Upload_Paper !== null) {
        console.log("hello");
        pathUpload = await handleFileUpload(formData.Upload_Paper);

        console.log("Upload path = ", pathUpload);
      } else {
        toast.error("Please select a file for upload", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      // If file upload is successful, continue with the form submission
      const formDataWithFilePath = {
        ...formData,
        Upload_Paper: pathUpload, // Use an empty string as a default if fileUploadPath is undefined
      };
      if (pathUpload === "") {
        // If file is null, display a toast alert
        toast.error("Some error occurred while uploading file", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsBook, formDataWithFilePath);

      // Display a success toast
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

      // Navigate to "/t/data" after successful submission
      navigate("/t/data");
    } catch (error) {
      // Handle file upload error
      console.error("File upload error:", error);

      // Display an error toast
      toast.error("File upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
          Book Publication
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
                // onChange={handleOnChange}
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
                Book Title
              </Typography>
              <Input
                id="Book_Title"
                size="lg"
                label="Title of book"
                type="text"
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
                type="text"
                value={formData.Chapter_if_any}
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
                type="text"
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
                id="Year"
                size="lg"
                label="Select Year_of_Publication"
                color="light-gray"
                value={formData.Year}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Year", value },
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
                type="text"
                label="Author"
                value={formData.ISBN_ISSN_DOI_any_other}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload_Paper document
              </Typography>
              <Input
                id="Upload_Paper"
                size="lg"
                type="file"
                label="Upload_Paper"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
           Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
