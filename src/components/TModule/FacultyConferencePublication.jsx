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

import { addRecordsFaculty, uploadRecordsFaculty } from "./API_Routes";

export default function FacultyConferencePublication() {
  const { currentUser } = useSelector((state) => state.user);

  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const [isAchievement, setIsAchievement] = useState("No");
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Title_of_the_Paper: "",
    Title_of_the_proceedings_of_the_conference: "",
    Name_of_the_conference: "",
    National_International: "",
    Author: "",
    Co_Authors:"",
    Date_of_conference: null,
    Conference_Venue_and_Organizer: "",
    Year_of_publication: "",
    ISSN_ISBN_number_of_the_proceeding: "",
    Affiliating_Institute_at_the_time_of_publication: "",
    Link_To_Paper: "",
    Upload_Paper: null,
    Financial_support_given_by_institute_in_INR: "",
    Upload_Evidence: null,
    DOI: "",
    Presented_Yes_No: "",
    Any_Achievements: "",
    Upload_DOA: null,
   
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (files) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "faculty_conference_publication");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_Paper) {
        formDataForUpload.append("files", formData.Upload_Paper);
        columnNames.push("Upload_Paper");
      }
      if (formData.Upload_Evidence) {
        formDataForUpload.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence");
      }
      if (formData.Upload_DOA) {
        formDataForUpload.append("files", formData.Upload_DOA);
        columnNames.push("Upload_DOA");
      }


      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsFaculty}?${queryParams.toString()}`;
      console.log("formdata", formDataForUpload)
      const response = await axios.post(url, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data?.uploadResults);
      return response?.data?.uploadResults;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error?.response?.data?.message, {
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
      // Handle error as needed
    }
  };


  //Add records
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.Upload_Paper === null) {
      toast.error("Select file for upload", {
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
    // Check if evidence upload is required
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }
    if (isAchievement === "Yes" && formData.Upload_DOA === null) {
      alert("Upload Achievement document");
      return;
    }

    try {
      const filesToUpload = [];
      if (isFinancialSupport && formData.Upload_Evidence) {
        filesToUpload.push(formData.Upload_Evidence);
      }
      if (formData.Upload_DOA !== null) {
        filesToUpload.push(formData.Upload_DOA);
      }
      if (formData.Upload_Paper !== null) {
        filesToUpload.push(formData.Upload_Paper);
      }

      // If file upload is successful, continue with the form submission
      const uploadResults = await handleFileUpload(filesToUpload);

      // Store the paths of uploaded files in the uploadedFilePaths object
      const updatedUploadedFilePaths = { ...uploadedFilePaths };
      uploadResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });
      setUploadedFilePaths(updatedUploadedFilePaths);

      // Merge uploaded file paths with existing formData
      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };
      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsFaculty, formDataWithFilePath);

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
      toast.error(error?.response?.data?.message, {
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
                Author
              </Typography>
              <Input
                size="lg"
                type="text"
                label="Author Name"
                onChange={handleInputChange}
                name="Author"
                value={formData.Author}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co Authors
              </Typography>
              <Input
                size="lg"
                label="Co Authors Name"
                onChange={handleInputChange}
                type="text"
                name="Co_Authors"
                value={formData.Co_Authors}
              />
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
                onChange={handleInputChange}
                name="Link_To_Paper"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Paper (Only Pdf)
              </Typography>
              <Input
                size="lg"
                type="file"
                label="Upload Paper"
                onChange={handleInputChange}
                name="Upload_Paper"
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
                    name="Upload_Evidence"
                    type="file"
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
                name="Presented_Yes_No"
                value={formData.Presented_Yes_No}
                // onChange={handleInputChange}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "Presented_Yes_No", value },
                  })
                }
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
                value={isAchievement}
                onChange={(value) => setIsAchievement(value)}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
            {isAchievement === "Yes" && (
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Achievement Document (Only Pdf)
                </Typography>
                <Input
                  size="lg"
                  type="file"
                  label="Upload Achievement Document"
                  onChange={handleInputChange}
                  name="Upload_DOA"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
